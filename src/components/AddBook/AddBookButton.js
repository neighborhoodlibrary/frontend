import React from "react";
import firebase from "../../firebase/firebase.utils";
import { Button } from 'reactstrap';
import "firebase/auth";



export default function AddBookButton(props) {
    
    const db = firebase.firestore();
    
    const auth = firebase.auth();

    var curUser = auth.currentUser;
    
    const addBook = () => {
        const bookobj = props.book;

        if(!bookobj.authors) {
            bookobj.authors = ["N/A"]
        }

        if(bookobj.industryIdentifiers){
            var isbnhold = bookobj.industryIdentifiers.map(iden => {
                if(iden.type === "ISBN_13"){
                    return iden.identifier
                } else {
                    return bookobj.id
                }
            })
        }

        isbnhold = isbnhold[0].toString();

    
        db.collection("books")
          .doc()
          .set({
            title: bookobj.title,
            authors: bookobj.authors,
            checkedOut: false,
            borrowerId: "",
            googleId: bookobj.id,
            ownerId: curUser.uid,
            isbn: isbnhold
          })
    
        console.log(bookobj)
    }

    return (
        <Button onClick={addBook}>
            Add
        </Button>
    )
}
