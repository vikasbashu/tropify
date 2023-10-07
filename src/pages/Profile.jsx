import React, {useState, useEffect} from "react";
import { useFirebase } from "../context/Firebase";

export const Profile = (props) => {
    const [user, setUser] = useState(null);
    const firebase = useFirebase();
    useEffect(()=>{
        const userStatus = firebase.userLoginStatus();
        userStatus && setUser(userStatus);
    }, [firebase]);
    console.log(user);
    return (
        <div className="container mt-5">
            <h1>{`Hi ${user.displayName},`}</h1>
            <img src={user.profileURL} width="50%" style={{borderRadius: "10px"}}/>
            <h2>Details:</h2>
            <p><strong>Email : </strong>{user.email}</p>
            <p><strong>ID : </strong>{`${user.uid}`}</p>
            
    </div>
    );
}