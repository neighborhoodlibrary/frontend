import firebase from 'firebase'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyA38qCNWOEv6GEmh0EervQ-2MhPJIgLRkw",
    authDomain: "neighborhood-library-54fa1.firebaseapp.com",
    databaseURL: "https://neighborhood-library-54fa1.firebaseio.com",
    projectId: "neighborhood-library-54fa1",
    storageBucket: "",
    messagingSenderId: "477537368764",
    appId: "1:477537368764:web:7d25040fa2254e3e"
  };

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  
  const db = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  export const firstTimeLogin = () => auth.signInWithPopup(provider).then(result => {
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

  export default firebase;