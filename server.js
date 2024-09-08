const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// Define the port
const port = 5000;

// MySQL connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "JNC",
});

// Connect to MySQL and handle connection errors
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit if connection fails
  } else {
    console.log("Connected to the MySQL database");
  }
});

// Routes

// Add a new student
app.post("/add_user", (req, res) => {
  const sql = "INSERT INTO students (`reg`, `name`, `department`, `class`) VALUES (?, ?, ?, ?)";
  const values = [req.body.reg, req.body.name, req.body.department, req.body.class];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding student:", err);
      return res.status(500).json({ message: "An error occurred: " + err });
    }
    res.json({ success: "Student added successfully" });
  });
});

// Get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ message: "Server error: " + err });
    }
    res.json(result);
  });
});

// Get a specific student by registration number
app.get("/get_student/:reg", (req, res) => {
  const reg = req.params.reg;
  console.log(`Fetching student with reg: ${reg}`);
  const sql = "SELECT * FROM students WHERE reg=?";
  
  db.query(sql, [reg], (err, result) => {
    if (err) {
      console.error("Error fetching student:", err);
      return res.status(500).json({ message: "Server error: " + err });
    }
    console.log("Query result:", result);
    if (result.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(result);
  });
});


// Edit a student
app.post("/edit_user/:reg", (req, res) => {
  const reg = req.params.reg;
  const sql = "UPDATE students SET `name`=?, `department`=?, `class`=? WHERE reg=?";
  const values = [req.body.name, req.body.department, req.body.class, reg];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      return res.status(500).json({ message: "An error occurred: " + err });
    }
    res.json({ success: "Student updated successfully" });
  });
});

// Delete a student
app.delete("/delete/:reg", (req, res) => {
  const reg = req.params.reg;
  const sql = "DELETE FROM students WHERE reg=?";
  
  db.query(sql, [reg], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      return res.status(500).json({ message: "An error occurred: " + err });
    }
    res.json({ success: "Student deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
