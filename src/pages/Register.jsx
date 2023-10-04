import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useNavigate} from "react-router-dom";
import { useFirebase } from "../context/Firebase"; 

export const RegisterPage = (props) => {

    const firebase = useFirebase();
    const navigate = useNavigate();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
      firebase.userLoginStatus() && navigate("/");
    }, [firebase, navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await firebase.signUpUserWithEmailAndPassword(emailAddress, password);
            alert('Registered Successfully!');
        }catch(error){
            alert(error.message);
        }
        //response.user.emailAddress === emailAddress ? alert('Registered Successfully!'): alert('Please Retry!');
    }

    return (<div className="container mt-5">
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
            onChange={e => setEmailAddress(e.target.value)}
            value={emailAddress}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div> );
}