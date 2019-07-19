import React from 'react';
import NavMenu from './NavMenu/NavMenu';
import styled from 'styled-components';

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    h1{
        font-size: 3em;
        font-family: 'Merriweather', serif;
    }

    @media(max-width: 750px){
        flex-direction: column;
    }
`;

export default function Header() {
    return (
        <HeaderDiv>
            <h1>Neighborhood Library</h1>
            <NavMenu />
        </HeaderDiv>
    )
}
