import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from "../context/Firebase";

export const RecordCard = (props) => {
    const firebase = useFirebase();
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
                <Button variant="primary">View</Button>
            </Card.Body>
            </Card>
        </div>
    );
}