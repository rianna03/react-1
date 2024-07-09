import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = ()=> {

    const [data, setData] = useState({
        firstName:'',
        lastName:'',
        gender:''
    });
    
    //handle change in the input fields
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value })
    }

    const saveStudent = (e) => {
        e.preventDefault();

        // storing the access token in the session
        const token = sessionStorage.getItem('access_token');

        axios.post('http://localhost:4000/addStudents', data,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        })
        .then(res=> {
            toast.success('New student added successfully',{
                position:toast.POSITION.TOP_RIGHT,
                autoclose:3000
            });
        })

        .catch(err =>{
            toast.error('An error occurred while adding the student',{
                position:toast.POSITION.TOP_RIGHT,
                autoclose:3000
            });
        });
    }

    return(
        // form
        <div>
            <h3> Add New student</h3>
            <Form onSubmit={saveStudent}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control name="firstName" type="text" value={data.firstName} onChange={handleChange} placeholder="Enter firstname"></Form.Control>
                    <p>{data.firstName}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control name="lastName" type="text" value={data.lastName} onChange={handleChange} placeholder="Enter lastname"></Form.Control>
                    <p>{data.lastName}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Select onChange={handleChange} name="gender">
                         <option>--Gender--</option>
                         <option>Male</option>
                         <option>Female</option>
                    </Form.Select>
                </Form.Group>

                <Button variant='primary' type="submit">Save Student</Button>
                <ToastContainer/>
                
            </Form>
        </div>
    );
}

export default AddStudent;