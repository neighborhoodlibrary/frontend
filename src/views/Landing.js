import React, { useContext } from 'react';
import UserContext from '../context/user/userContext'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
// import neighborImg from '../assets/neighborhoodpic.jpg'

// const LandingImg = styled.div`
//     background: url(${neighborImg});
//     background-size: cover;
//     background-position: bottom;
//     height: 77VH;
// `




const Landing = () => {
    const userContext = useContext(UserContext)

    function redirect() {
        if(userContext.userState.loggedIn === true) {
            return <Redirect to="/shelf" />
        }
    }
  
    return (
        
            <div>
                
                {redirect()}
            </div>
       
    )
}

export default Landing;