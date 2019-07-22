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

        //Will refactor logic below later

        if(!bookobj.authors) {
            bookobj.authors = ["N/A"]
        }

        if(!bookobj.description) {
            bookobj.description = "No description found"
        }

        if(!bookobj.subtitle) {
            bookobj.subtitle = ""
        }

        if(!bookobj.publishedDate) {
            bookobj.publishedDate = "Not found"
        }

        if(!bookobj.publisher) {
            bookobj.publisher = "Not found"
        }

        if(bookobj.industryIdentifiers){
            var isbnhold = bookobj.industryIdentifiers
        }

    
        db.collection("books")
          .doc()
          .set({
            title: bookobj.title,
            subtitle: bookobj.subtitle,
            authors: bookobj.authors,
            description: bookobj.description,
            language: bookobj.language,
            pageCount: bookobj.pageCount,
            publishedDate: bookobj.publishedDate,
            publisher: bookobj.publisher,
            thumbnail: '',
            googThumbnail: bookobj.thumbnail,
            googleId: bookobj.id,
            //TO BE REMOVEDvv
            isbn: bookobj.id,
            //TO BE REMOVED^^
            googIi: isbnhold,
            checkedOut: false,
            borrowerId: "",
            ownerId: curUser.uid
          })
    
        console.log(bookobj)
    }

    return (
        <Button onClick={addBook}>
            Add Book
        </Button>
    )
}
