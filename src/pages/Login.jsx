import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase"; 
import { ButtonGroup } from "react-bootstrap";

export const LoginPage = (props) => {

    const firebase = useFirebase();
    const navigate = useNavigate();
    console.log(firebase.userLoginStatus());
    useEffect(()=>{
        firebase.userLoginStatus() && navigate("/");
    }, [firebase, navigate]);

    //const isLoggedIn = firebase.userLoginStatus() ? true: false;

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await firebase.loginUser(emailAddress, password);
            alert('Loggedin Successfull!');
        }catch(error){
            alert(error.message);
        }
        //firebase.userLoginStatus() ? alert('Loggedin Successfull!'): alert('Inavalid email/password');
    }
    const loginWithGoogle = () => {
        try{
            firebase.signUpWithGoogle();
        }catch(error){

        }
    }

    return (<div className="container mt-5">
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
            onChange={e => setEmailAddress(e.target.value)}
            value={emailAddress}
          />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <ButtonGroup className="">
        <Button variant="primary" type="submit">
          Login
        </Button>
        </ButtonGroup>
      </Form>
      <Button variant="danger" onClick={loginWithGoogle} className="mt-2">Continue with Google</Button>
    </div> );
}