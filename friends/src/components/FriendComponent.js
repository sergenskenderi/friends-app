import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import {Card , Button} from "react-bootstrap";

const FriendComponent = () => {
    const history = useHistory();
    const {id} = useParams();
    const [friend , setFriend] = useState({
        id : "",
        name : "",
        email : ""
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

    return (
        <Card style={{ width: '22rem' , margin:'auto' , marginTop:'5%' }}>
                    <Card.Img variant="top" style={{width:'50%' , margin:'auto'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKA6KdXhlE67NrzgjVglRnHcc_eXMyyEH89y-d6QXzTDTFtmMzUn-SzW-PDUveIUd_eE&usqp=CAU" />
                    <Card.Body>
                        <Card.Title>{friend.name}</Card.Title>
                        <Card.Text>
                         Email : <strong>{friend.email}</strong>
                        </Card.Text>
                        <Card.Text>
                         Age : <strong>{friend.age}</strong>
                        </Card.Text>
                        <Button variant="primary" onClick={goBack}>Go Back</Button>
                    </Card.Body>
                    </Card>
    )
}

export default FriendComponent;