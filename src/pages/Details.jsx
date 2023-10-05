import React , {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Button } from "react-bootstrap";

export const DetailsPage = (props) => {
    const params = useParams();
    const firebase = useFirebase();
    const [details, setDetails] = useState(null);
    const [url, setUrl] = useState(null);
    useEffect(()=>{
        firebase.getDocument('books', params.bookId).then((bookDetails)=>{
            setDetails(bookDetails);
        });
    }, [firebase, params]);
    useEffect(()=>{
        if(details){
            firebase.getStorageDataUrl(details.imageURL).then((value) => {
                setUrl(value);
            });
        }
    }, [firebase, details]);
    const purchaseCourse = async () => {
        try{
            const resp = await firebase.writeDataInFireStore(`books/${params.bookId}/orderBy`, {
                buyerId: details.userDetails.id,
                email: details.userDetails.email,
                name: details.userDetails.displayName
            });
            alert("Purchased Successfully!");
        }catch(error){
            alert(error.message);
        }
    }
    console.log(details);
    if(!details) return <h1>Loading...</h1>
    return (
        <div className="container mt-5">
            <h1>{details.name}</h1>
            <p>{details.description}</p>
            <img src={url} width="50%" style={{borderRadius: "10px"}}/>
            <h2>Details:</h2>
            <p><strong>Publisher : </strong>{details.publisher}</p>
            <p><strong>Price : </strong>{`₹${details.price}`}</p>
            <p><strong>ISBN : </strong>{details.isbn}</p>
            <h2>Offer By:</h2>
            <p><strong>Instructor : </strong>{details.userDetails.displayName}</p>
            <p><strong>Email : </strong>{details.userDetails.email}</p>
            <Button variant="danger" onClick={purchaseCourse}>Buy Now</Button>

        </div>
    );
}