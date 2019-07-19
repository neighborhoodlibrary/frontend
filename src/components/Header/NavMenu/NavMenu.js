import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SignInButton from '../../SignIn/SignInButton';

const NavMenuDiv = styled.div`
    display: flex;
    align-items: center;

    a {
        margin: 0px 5px;
        background-color: #f0efed;
        color: #1a1919;
        font-size: .95em;
        padding: 6px 11px;
        border-radius: 2px;
        text-decoration: none;
        font-family: 'Merriweather Sans', sans-serif;
    }

    a:hover{
        background-color: #eeedeb;
    }

    
    @media(max-width: 1000px){
        flex-direction: column;
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
                    <NavLink to='/shelf/add'>Add A Book</NavLink>
                </div>

                <SignInButton />
            </NavMenuDiv>
        )
    }
}
