import React, { useEffect, useState } from "react";
import {Form , Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../App.css";
import axiosWithAuth from "../utils/axiosWithAuth";

const FriendForm = () => {
    const history = useHistory();
    const [friends , setFriends] = useState([]);
    const [data , setData] = useState({
        id : '',
        name : '',
        age : '',
        email : ''
    });
    const [error , setError] = useState("");
    
    useEffect(() => {
        return (
        axiosWithAuth()
        .get('/api/friends')
        .then( res => { 
           setFriends(res.data);
        })
        .catch(err => {setError(err)})
        )
     }, [])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value,
            id : friends[friends.length-1].id + 1
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var valid = true;
        // eslint-disable-next-line
        friends.map(friend => {
            if(friend.name === data.name){
                setError("This Name already exists");
                valid = false;
            }
            if(friend.email === data.email){
                setError("This Email already exists");
                valid = false;
            }
        })
        if(valid){
        axiosWithAuth()
        .post('/api/friends',data)
        .then(res => {
            history.push('/friends')
        })
        .catch(err => console.log(err));
        }
    }

    return (
        <div className="addFriendForm">
        <Form onSubmit={handleSubmit}>
            <Button variant="outline-dark" className="backButton" onClick={() => {history.push('/friends')}}>
                Back
            </Button>
            <h3 className="titleFriendForm">Add new Friend</h3>
            {error && <p style={{color:'red'}}>{error}</p>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter name"  value={data.name} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" name="age" placeholder="Age" value={data.age} onChange={handleChange}/>
            </Form.Group>
            
            <Button variant="outline-dark" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}

export default FriendForm;