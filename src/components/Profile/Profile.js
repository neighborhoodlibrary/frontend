import React, { useContext, useState } from 'react';

import UserContext from "../../context/user/userContext";

import "firebase/auth";
import firebase from "../../firebase/firebase.utils";

import './Profile.css';

export default function Profile() {
    const db = firebase.firestore();
    const auth = firebase.auth();

    var userContext = useContext(UserContext);

    var curUser = userContext.userState.user;

    const userDB = db.collection("users").doc(`${auth.currentUser.uid}`);

    const [values, setValues] = useState({
        edited: {
          displayName: curUser.displayName,
          favoriteBook: curUser.favoriteBook
        },
        locked: {
          displayName: curUser.displayName,
          favoriteBook: curUser.favoriteBook,
          uid: curUser.uid
        }
      });

    const [edit, setEdit] = useState({
      isOn: false
    })

    const toggleEdit = () => {
      setEdit({...edit, isOn: !edit.isOn});
    }

    const handleChanges = e => {
        const { name, value } = e.target;
        setValues(
          { ...values,
             edited: {
              [name]: value }
        });
      };

    const updateProfile = e => {
      e.preventDefault();
      userDB.update(values.edited)
        .then(function() {
          console.log("updated")
        })
        .catch(function(error) {
          console.log(error);
        })

        setValues({
          ...values,
          locked: values.edited
        });

        userDB.get().then(function(user) {
          userContext.addUser(user.data())
        }).catch(function(error) {
          console.log(error);
        })

        toggleEdit();
    }

    if(edit.isOn === false) {
      return (
          <div className="editProfile">
            <div className="editOff">
              <div className="profileBox">

                  <div className="profileSlot"><h3>
                  Display Name:
                  </h3><p>
                  {values.locked.displayName}
                  </p></div>

                  <div className="profileSlot"><h3>
                  Favorite Book:
                  </h3> <p>
                  {values.locked.favoriteBook}
                  </p></div>

              </div>
              <button className="heartbeat" onClick={toggleEdit}>Edit</button>
            </div>
          </div>
      )
    } else {
      return (
        <div className="editProfile">
          <div className="editOn">
            <form onSubmit={updateProfile}>
              <input name="displayName" value={values.edited.displayName} onChange={handleChanges} placeholder="Enter display name" />
              <input name="favoriteBook" value={values.edited.favoriteBook} onChange={handleChanges} placeholder="Enter your favorite Book" />
              <button>Submit Changes</button>
            </form>
            <button onClick={toggleEdit}>Close Edit</button>
          </div>
        </div>
      )
    }

}
