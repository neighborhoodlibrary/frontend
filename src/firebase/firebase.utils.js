import firebase from "firebase";

const config = {
  apiKey: "AIzaSyA38qCNWOEv6GEmh0EervQ-2MhPJIgLRkw",
  authDomain: "neighborhood-library-54fa1.firebaseapp.com",
  databaseURL: "https://neighborhood-library-54fa1.firebaseio.com",
  projectId: "neighborhood-library-54fa1",
  storageBucket: "neighborhood-library-54fa1.appspot.com",
  messagingSenderId: "477537368764",
  appId: "1:477537368764:web:7d25040fa2254e3e"
};

firebase.initializeApp(config);

export default firebase;
