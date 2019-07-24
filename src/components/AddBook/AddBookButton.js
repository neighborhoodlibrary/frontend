import React from "react";
import firebase from "../../firebase/firebase.utils";
import { Button } from 'reactstrap';
import "firebase/auth";
import { useAlert } from 'react-alert'

var uniqueID = require('uniqid');

export default function AddBookButton(props) {
    const alert = useAlert()
    
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

        if(bookobj.cover_i){
            bookobj.thumbnail = "http://covers.openlibrary.org/b/id/" + bookobj.cover_i + "-M.jpg";
            //TO BE REMOVED
            bookobj.googThumbnail = "http://covers.openlibrary.org/b/id/" + bookobj.cover_i + "-M.jpg";
        } else if (bookobj.isbn) {
            bookobj.thumbnail = "http://covers.openlibrary.org/b/isbn/" + bookobj.isbn[0] + "-M.jpg";
            bookobj.googThumbnail = "http://covers.openlibrary.org/b/isbn/" + bookobj.isbn[0] + "-M.jpg";
        }


        if(!bookobj.subtitle) {
            bookobj.subtitle = ""
        }

        if(!bookobj.pageCount) {
            bookobj.pageCount = "N/A"
        }

        if(!bookobj.publishedDate) {
            bookobj.publishedDate = "Not found"
        }

        if(!bookobj.publisher) {
            bookobj.publisher = "Not found"
        }

        if(bookobj.industryIdentifiers){
            var isbnhold = bookobj.industryIdentifiers
        } else {
            var isbnhold =
                [{
                    type: "ISBN",
                    identifier: bookobj.isbn[0]
                }]

        }

        var idHold = uniqueID("nl-");
    
        db.collection("books")
          .doc(idHold)
          .set({
            title: bookobj.title,
            subtitle: bookobj.subtitle,
            authors: bookobj.authors,
            description: bookobj.description,
            pageCount: bookobj.pageCount,
            publishedDate: bookobj.publishedDate,
            publisher: bookobj.publisher,
            thumbnail: '',
            googThumbnail: bookobj.thumbnail,
            googIi: isbnhold,
            isbn: isbnhold,
            checkedOut: false,
            borrowerId: "",
            ownerId: curUser.uid,
            id: idHold
          })

        alert.success('Success!')
    
        console.log(bookobj)
    }

    return (
        <Button color="primary" onClick={addBook}>
            Add Book
        </Button>
    )
}
