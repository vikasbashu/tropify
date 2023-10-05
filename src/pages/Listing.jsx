import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"; 
import { useFirebase } from "../context/Firebase";
//import { v4 as uuidv4 } from 'uuid';

export const AddListing = () => {
    
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [isbn, setISBN] = useState("");
    const [cover, setCover] = useState(null);
    const [publisher, setPublisher] = useState("");


    const handleSubmit = async (e)=> {
        e.preventDefault();
        try{
            const fileStorage = await firebase.addDataInStorage("uploads/images", cover);
            const user = firebase.userLoginStatus();
            user && await firebase.writeDataInFireStore("books", {
                name,
                description,
                price,
                publisher,
                isbn,
                imageURL: fileStorage.ref.fullPath,
                userDetails: {
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photo: user.photoURL
                }
            });
            alert("Record Added Successfully!");
            navigate("/");
        }catch(error){
            alert(error.message);
        }
    }
    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" placeholder="Book Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPublisher">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control type="text" placeholder="Publisher" 
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formISBN">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" placeholder="ISBN" 
                    value={isbn}
                    onChange={(e) => setISBN(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCover">
                    <Form.Label>Cover</Form.Label>
                    <Form.Control type="file"
                    onChange={(e) => setCover(e.target.files[0].name)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
             </Form>
        </div>
    );
}