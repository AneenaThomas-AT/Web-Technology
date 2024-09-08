import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    useEffect(() => {
        if (deleted) {
            setDeleted(false);
            axios.get('/students')
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [deleted]);

    function handleDelete(reg) {
        axios.delete(`/delete/${reg}`)
            .then((res) => {
                setDeleted(true);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h3>Students</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/create'>Add Student</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Reg NO</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Class</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <tr key={student.reg}>
                            <td>{student.reg}</td>
                            <td>{student.name}</td>
                            <td>{student.department}</td>
                            <td>{student.class}</td>
                            <td>
                                <Link className='btn mx-2 btn-success' to={`/read/${student.reg}`}>Read</Link>
                                <Link className='btn mx-2 btn-success' to={`/edit/${student.reg}`}>Edit</Link>
                                <button onClick={() => handleDelete(student.reg)} className='btn mx-2 btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
