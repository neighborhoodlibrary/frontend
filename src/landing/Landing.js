import React, { useContext } from 'react';
import UserContext from '../context/user/userContext'
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';

//For future

const LandHold = styled.div`
`;

const Landing = () => {
    const userContext = useContext(UserContext)

    function redirect() {
        if(userContext.userState.loggedIn === true) {
            return <Redirect to="/shelf" />
        }
    }
  
    return (
        
            <LandHold>
                {redirect()}
            </LandHold>
       
    )
}

export default Landing;