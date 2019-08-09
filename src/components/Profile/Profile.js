import React, { useContext, useState } from 'react';

import UserContext from "../../context/user/userContext";

import "firebase/auth";
import firebase from "../../firebase/firebase.utils";

export default function Profile() {
    const db = firebase.firestore();

    const userDB = db.collection("users").doc();

    var userContext = useContext(UserContext);

    var curUser = userContext.userState.user;

    console.log(curUser);

    const [values, setValues] = useState({
        displayName: curUser.displayName
      });

    const handleChanges = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

    return (
        <div>
            {values.displayName}
        </div>
    )
}
