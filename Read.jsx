import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { reg } = useParams(); // Use 'reg' from URL params

  useEffect(() => {
    axios.get(`/get_student/${reg}`)
      .then((res) => {
        console.log("Student data received:", res.data);
        if (res.data.length > 0) {
          setStudent(res.data[0]); // Assuming the API returns an array with one object
        } else {
          setError("Student not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        setError("Error fetching student data");
        setLoading(false);
      });
  }, [reg]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {reg}</h1>
      <Link to="/" className="btn btn-success">Back</Link>
      {student ? (
        <ul className="list-group">
          <li className="list-group-item"><b>Reg No: </b>{student.reg}</li>
          <li className="list-group-item"><b>Name: </b>{student.name}</li>
          <li className="list-group-item"><b>Department: </b>{student.department}</li>
          <li className="list-group-item"><b>Class: </b>{student.class}</li>
        </ul>
      ) : (
        <div>No student data available</div>
      )}
    </div>
  );
}

export default Read;
