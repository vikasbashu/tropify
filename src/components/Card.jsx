import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export const RecordCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url, setImageURL] = useState(null);

    useEffect(()=>{
        firebase.getStorageDataUrl(props.imageURL).then((url) => {
            setImageURL(url);
            //console.log(url);
        });
    },[firebase, props]);

    return (
        <div>
             <Card style={{ width: '18rem' , margin:'25px'}}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                {props.description}
                </Card.Text>
                <Button variant="primary" onClick={(e) => navigate(`/book/view/${props.id}`)}>View</Button>
            </Card.Body>
            </Card>
        </div>
    );
}