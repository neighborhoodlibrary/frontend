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
          displayName: curUser.displayName
        },
        locked: {
          displayName: curUser.displayName,
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
          <div className="editOff">
            <div className="profileBox">
              Display Name: {values.locked.displayName}
            </div>
            <button onClick={toggleEdit}>Edit</button>
          </div>
      )
    } else {
      return (
        <div className="editOn">
          <form onSubmit={updateProfile}>
            <input name="displayName" value={values.edited.displayName} onChange={handleChanges} placeholder="Enter display name" />
            <button>Submit Changes</button>
          </form>
          <button onClick={toggleEdit}>Close Edit</button>
        </div>
      )
    }

}
