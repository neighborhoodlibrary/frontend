import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SignInButton from '../../SignIn/SignInButton';

const NavMenuDiv = styled.div`
    display: flex;
    align-items: center;

    a {
        margin: 0px 5px;
        background-color: #8899AA;
        color: white;
        font-size: .95em;
        padding: 5px 10px;
        border-radius: 3px;
        text-decoration: none;
    }

    .hide {
        display: none;
    }

    .shown {

    }
`

export default class NavMenu extends Component {
    
    render() {
        return (
            <NavMenuDiv>
                <div class="shown">
                    <NavLink to='/shelf/borrowed'>Borrowed</NavLink>
                    <NavLink to='/shelf/loaned'>Loaned</NavLink>
                    <NavLink to='/shelf/library'>Library</NavLink>
                </div>

                <SignInButton />
            </NavMenuDiv>
        )
    }
}
