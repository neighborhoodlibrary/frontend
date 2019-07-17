import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SignInButton from '../../SignIn/SignInButton';

const NavMenuDiv = styled.div`
    display: flex;
    align-items: center;

    a {
        padding: 0px 5px;
    }
`

export default class NavMenu extends Component {
    render() {
        return (
            <NavMenuDiv>
                <NavLink to='/shelf/borrowed'>Borrowed</NavLink>
                <NavLink to='/shelf/loaned'>Loaned</NavLink>
                <NavLink to='/shelf/library'>Library</NavLink>

                <SignInButton />
            </NavMenuDiv>
        )
    }
}
