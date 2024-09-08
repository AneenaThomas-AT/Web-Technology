import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        reg: '',
        name: '',
        department: '',
        class: ''
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/add_user', values)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Student</h3>
                <div className='d-flex justify-content-end'>
                    <Link to='/' className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='RegNo'>Reg No</label>
                        <input type='text' name='reg' required onChange={(e) => setValues({ ...values, reg: e.target.value })} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='Name'>Name</label>
                        <input type='text' name='name' required onChange={(e) => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='Department'>Department</label>
                        <input type='text' name='department' required onChange={(e) => setValues({ ...values, department: e.target.value })} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='Class'>Class</label>
                        <input type='text' name='class' required onChange={(e) => setValues({ ...values, class: e.target.value })} />
                    </div>
                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-success'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
