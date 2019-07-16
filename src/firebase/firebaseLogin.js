import firebase from './firebase.utils'
import 'firebase/auth'

const auth = firebase.auth()

const db = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

export const firstTimeLogin = () => auth.signInWithPopup(provider).then(result => {
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
  })

