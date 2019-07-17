import React from 'react';
import Redirect from 'react-router-dom';
import NavMenu from './NavMenu/NavMenu';
import styled from 'styled-components';

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

export default function Header() {
    return (
        <HeaderDiv>
            <h1>Neighborhood Library</h1>
            <NavMenu />
        </HeaderDiv>
    )
}
