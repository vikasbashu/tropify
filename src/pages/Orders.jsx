import React, {useEffect, useState} from "react";
import { useFirebase } from "../context/Firebase";

export const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const firebase = useFirebase();
    const user = firebase.userLoginStatus();
    useEffect(()=>{
        if(user){
            firebase.getDocumentsByQuery('books', firebase.where("price", ">=", 99))?.then((value) => {
                setOrders(value);
            });
        }
    }, [user, firebase]);
    console.log(orders);
    return (
        <div className="container mt-5">Order Page</div>
    );
}