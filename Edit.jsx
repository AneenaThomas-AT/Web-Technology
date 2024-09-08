import React, { useState, useEffect } from "react";
import axios from "axios";

const Edit = ({ reg }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/get_student/${reg}`)
      .then((res) => {
        console.log("Student data received:", res.data);
        if (res.data.length > 0) {
          setStudent(res.data[0]);
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
    <div>
      {student ? (
        <div>
          <h2>Edit Student</h2>
          <form>
            <label>
              Name:
              <input type="text" value={student.name} readOnly />
            </label>
            <label>
              Department:
              <input type="text" value={student.department} readOnly />
            </label>
            <label>
              Class:
              <input type="text" value={student.class} readOnly />
            </label>
          </form>
        </div>
      ) : (
        <div>Student not found</div>
      )}
    </div>
  );
};

export default Edit;
