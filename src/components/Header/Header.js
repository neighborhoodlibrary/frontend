import React from 'react';
import NavMenu from './NavMenu/NavMenu';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin: 20px 0px;

    h1{
        font-size: 3.25em;
        font-family: 'Merriweather', serif;
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover{
        color: black;
    }

    @media(max-width: 800px){
        flex-direction: column;
    }
`;

export default function Header() {
    return (
        <HeaderDiv>
            <NavLink to='/'>
                <h1>Neighborhood Library</h1>
            </NavLink>
            <NavMenu />
        </HeaderDiv>
    )
}
