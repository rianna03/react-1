import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const AllStudents = () => {
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
                                                Edit customer
                                            </Link>
                                            <Link to={`/deleteStudent/${d._id}`} className="dropdown-item">
                                                Delete customer
                                            </Link>
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
