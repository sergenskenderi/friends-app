import React from "react";
import '../App.css';
import {Form , Button} from "react-bootstrap";
import {FaUserCircle} from "react-icons/fa";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const history = useHistory();
    const handleChange = (e) => {
        props.setCredentials({
           ...props.credentials , 
           [ e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // post ajax and set token
        axiosWithAuth().post('/api/login' , props.credentials)
        .then(res => {
            window.localStorage.setItem('token' , res.data.payload);
            history.push('/friends');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="loginForm">
            <Form onSubmit={handleSubmit}>
            <FaUserCircle className="mainIcon" size={80}/>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter username" value={props.credentials.username} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={props.credentials.password} onChange={handleChange}/>
            </Form.Group>
            <Button variant="dark" type="submit">
                Submit
            </Button>
            </Form>
        </div>
    )
}

export default Login;