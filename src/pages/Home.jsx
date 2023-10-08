import React, {useState, useEffect} from "react";
import { useFirebase } from "../context/Firebase";
import { RecordCard } from "../components/Card";
import { CardGroup } from "react-bootstrap";

export const HomePage = (props) => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    const requestPermission = async () => {
        const permission = await Notification.requestPermission();
        if(permission === 'granted'){
            const token = await firebase.generateToken();
            return token;
        }
    }
    useEffect(()=>{
        //requestPermission().then((value)=> console.log(value));
    }, []);
    useEffect(()=>{
        firebase.getDocumentsByQuery("books").then((books)=>{
            //console.log(books.docs[0].data());
            setBooks(books.docs);
        });
    }, [firebase]);
    return (
        <div className="container mt-5">
            <CardGroup>
            {
                books.map((book)=>(
                    <RecordCard key={book.id} id={book.id} {...book.data()}/>
                ))
            }
            </CardGroup>
        </div>
    );
}