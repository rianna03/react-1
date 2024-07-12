import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = ()=> {

    const history = useHistory();
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
        //const token = sessionStorage.getItem('access_token');

        // sending payload to the console
        console.log('Sending payload:', data);

        axios.post('http://localhost:4000/addStudent', data)

            .then(res=> {
            toast.success('New student added successfully',{
                position:toast.POSITION.TOP_RIGHT,
                autoclose:3000
            });
            history.push('/students');
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
                    <Form.Control name="firstName" type="text"  onChange={handleChange} placeholder="Enter first name"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control name="lastName" type="text"  onChange={handleChange} placeholder="Enter last name"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Gender:</Form.Label>
                    <Form.Select onChange={handleChange} name="gender" defaultValue="">
                        <option value="" disabled>Choose gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                </Form.Group>


                <Button variant='success' type="submit">Save Student</Button>
                <ToastContainer/>
                
            </Form>
        </div>
    );
}

export default AddStudent;