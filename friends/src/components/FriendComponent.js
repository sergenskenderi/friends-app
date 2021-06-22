import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import {Card , Button , Form} from "react-bootstrap";
import "../App.css";

const FriendComponent = () => {
    const history = useHistory();
    const {id} = useParams();
    const [friend , setFriend] = useState({
        id : "",
        name : "",
        email : "",
        age : ""
    });
    const [message , setMessage] = useState({
        error : "",
        success : ""
    });

    useEffect( () => {
        axiosWithAuth()
        .get(`/api/friends/${id}`)
        .then(res => {
            setFriend(res.data);
        })
        .catch( err => console.log(err));
    },[id]);

    const goBack = (e) => {
        history.push('/friends');
    }

    const handleChange = (e) => {
        setFriend({
            ...friend,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .put(`/api/friends/${friend.id}`,friend)
        .then( res => {
            setMessage({
                ...message,
                success : "Friend has been changed succefully"
            })
        })
        .catch(err => {
            setMessage({
                ...message,
                error : "Something went wrong"
            })
        });
    }

    return (
        <Card style={{ width: '22rem' , margin:'auto' , marginTop:'5%' }}>
            <Card.Img variant="top" style={{width:'50%' , margin:'auto'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKA6KdXhlE67NrzgjVglRnHcc_eXMyyEH89y-d6QXzTDTFtmMzUn-SzW-PDUveIUd_eE&usqp=CAU" />
            <Card.Body>
            <Form onSubmit={handleSubmit}>
                {message.error && <p style={{color:'red'}}>{message.error}</p>}
                {message.success && <p style={{color:'green'}}>{message.success}</p>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name"  value={friend.name} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Email" value={friend.email} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name="age" placeholder="Age" value={friend.age} onChange={handleChange} required/>
                </Form.Group>
                <Button variant="outline-dark" onClick={goBack}>Go Back</Button>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Card.Body>
     </Card>
    )
}

export default FriendComponent;