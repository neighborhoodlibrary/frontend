import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/user/userContext'
import 'firebase/auth'

import SignInButton from '../components/SignIn/SignInButton';

import { Redirect } from 'react-router-dom';

const Landing = () => {
    const userContext = useContext(UserContext)

    function redirect() {
        if(userContext.userState.loggedIn == true) {
            return <Redirect to="/shelf" />
        }
    }
  
    return (
        <div>
            Please sign in
            {redirect()}
        </div>
    )
}

export default Landing;