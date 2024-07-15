import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const AllStudents = () => {
    const { id } = useParams();
    const [data, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/students')
            .then(res => {
                console.log('Full API response:', res); 
                console.log('Response data:', res.data); 

                if (Array.isArray(res.data)) {
                    setRecords(res.data);
                } else if (Array.isArray(res.data.students)) {
                    setRecords(res.data.students);
                } else {
                    throw new Error('Data is not an array');
                }
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Delete functionality 
    const handleDelete = (_id) => {

        if (window.confirm('Are you sure you want to delete this student?')) {
            axios.delete(`http://localhost:4000/deleteStudent/${_id}`)
                .then(() => {
                    const updatedData = data.filter(student => student._id !== id);
                    setRecords(updatedData);
                    console.log('student deleted')
                })
                .catch(err => {
                    console.log('There was an error deleting the student!', err);
                });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className='table-responsive'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.firstName}</td>
                                <td>{d.lastName}</td>
                                <td>{d.gender}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                            Perform Actions
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Link to={`/updateStudent/${d._id}`} className="dropdown-item">
                                                Edit student
                                            </Link>
                                            <Dropdown.Item as={Button} onClick={() => handleDelete(d._id)}>
                                                Delete student
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllStudents;
