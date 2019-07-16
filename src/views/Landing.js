import React, { Component } from 'react';
import Header from '../components/Header/Header';
import { firstTimeLogin } from '../firebase/firebaseLogin'

export default class Landing extends Component {
    render() {
        return (
            <div>
                <Header />
                <button onClick={firstTimeLogin} >Sign In</button>
            </div>
        )
    }
}