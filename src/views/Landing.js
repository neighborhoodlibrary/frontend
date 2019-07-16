import React, { useContext } from 'react';
import Header from '../components/Header/Header';
import UserContext from '../context/user/userContext'
import firebase from '../firebase/firebase.utils'
import 'firebase/auth'

const Landing = () => {
    const userContext = useContext(UserContext)

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

    return (
        <div>
            <Header />
            <button onClick={firstTimeLogin} >Sign In</button>
        </div>
    )
}

export default Landing;