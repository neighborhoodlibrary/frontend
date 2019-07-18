import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SignInButton from '../../SignIn/SignInButton';

const LandingNavDiv = styled.div`
    display: flex;
    align-items: center;

    a {
        padding: 0px 5px;
    }
`

export default class LandingNav extends Component {
    render() {
        return (
            <LandingNavDiv>
                <NavLink to='/shelf'>
                    <button>Sign In</button>
                </NavLink>
            </LandingNavDiv>
        )
    }
}
