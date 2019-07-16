import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/user/userContext'
import firebase from '../firebase/firebase.utils'
import 'firebase/auth'

import { Redirect } from 'react-router-dom';

const Landing = () => {
    const userContext = useContext(UserContext)

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        loggedInToTrue()
        console.log(loggedIn)
        console.log(userContext.userState.user.email)
    })

    const loggedInToTrue = () => {
        setLoggedIn(true)
    }

    const auth = firebase.auth()

    const db = firebase.firestore()

    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    const firstTimeLogin = () => auth.signInWithPopup(provider).then(result => {
        console.log(result.user)
        const { displayName, email, photoURL, uid } = result.user


        db.collection('users').doc(uid).set({
            displayName,
            email,
            photoURL,
            zipcode: null,
            books: [],
            loaned: []
        })

        userContext.addUser(result.user)

    })

    function redirect() {
        if(userContext.userState.loggedIn == true) {
            return <Redirect to="/shelf" />
        }
    }

    // auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    // .then(function() {
    //   return firebase.auth().signInWithEmailAndPassword(email, password);
    // })
    // .catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });
  

    return (
        <div>
            <button onClick={firstTimeLogin} >Sign In</button>
            {redirect()}
        </div>
    )
}

export default Landing;