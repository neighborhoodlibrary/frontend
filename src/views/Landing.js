import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { signInWithGoogle } from '../firebase/firebase.utils'

export default class Landing extends Component {
    render() {
        return (
            <div>
                <Header />
                <button onClick={signInWithGoogle} >Sign In</button>
            </div>
        )
    }
}
