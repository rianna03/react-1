import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";


const Login = () => {

    const history = useHistory();
    const [credentials, setCredentials] = useState({
        username:"",
        password:""
    });

    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }

    const login = (e)=> {
        e.preventDefault();

        //sending payload to the console
        console.log('sending payload', credentials);

        //post method
        axios.post('http://localhost:4000/auth/login', credentials)
        .then(res =>{
            //storing the session
            sessionStorage.setItem('access_token', res.data.token);

            toast.success('Login Successful',{
                position:toast.POSITION.TOP_RIGHT,
                autoclose:3000
            });
            history.push('/home'); 
        })
        .catch(err=>{
            toast.error('Invalid Username or password',{
                position:toast.POSITION.TOP_RIGHT,
                autoclose:3000
            });
        });
    }

    return(
        <div>
            <h3>Login</h3>
            <Form onSubmit={login}>

                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control name="username" type="text" onChange={handleChange} placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control name="password" type="password" onChange={handleChange} placeholder="Enter password" />
                </Form.Group>

                <Button variant='success' type="submit">Login</Button>
                <ToastContainer />
                
            </Form>
        </div>
    );
}

export default Login;