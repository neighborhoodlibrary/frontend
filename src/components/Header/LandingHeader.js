import React from 'react';
import Redirect from 'react-router-dom';
import LandingNav from './LandingNav/LandingNav'
import styled from 'styled-components';

const LandingHeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

export default function Header() {
    return (
        <LandingHeaderDiv>
            <h1>Neighborhood Library</h1>
            <LandingNav />
        </LandingHeaderDiv>
    )
}