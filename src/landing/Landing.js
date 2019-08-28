// import React from "react";
// import SignInComponent from "./SignInComponent";
// import styled from "styled-components";
// import neiImg from "../assets/neighborpic2.jpg";


// const LOHeadDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: url(${neiImg});
//   background-size: cover;
//   background-position: center top;
// `;

// const ClarityDiv = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 50px 0px;
//   background-color: rgb(0,0,0,0.5);
//   width: 100vw;
//   padding: 20px 0px;
//   -webkit-box-shadow: 2px 2px 5px 0px rgba(50, 50, 50, 0.75);
//   -moz-box-shadow:    2px 2px 5px 0px rgba(50, 50, 50, 0.75);
//   box-shadow:         2px 2px 5px 0px rgba(50, 50, 50, 0.75);

//   h1 {
//     font-size: 4em;
//     font-family: "Merriweather", serif;
//     color: rgba(250,250,250,.95);
//   }

//   h2 {
//     color: rgba(250,250,250,.9);
//     font-family: "Merriweather", serif;
//     font-size: 1.75em;
//   }

//   }
  
//   @media (max-width: 800px) {
//     h1 {
//       font-size: 3em;
//     }
  
//     h2 {
//       color: white;
//       font-size: 1.25em;
//     }
//   }

//   @media (max-width: 500px) {
//     h1 {
//       font-size: 2.5em;
//     }
  
//     h2 {
//       color: white;
//       font-size: 1em;
//     }
//   }
// `;

// const LOButtonHold = styled.div`
//   padding: 40px 0px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;



// const Landing = props => {
//   return (

//     <LOHeadDiv>
//       <ClarityDiv>
//         <h1>Neighborhood Library</h1>
//         <h2>Read great books in your area</h2>
//       </ClarityDiv>
//       <LOButtonHold>
//         <SignInComponent routerProps={props} />
//       </LOButtonHold>
//       <LandingTwo />
//       </LOHeadDiv>

//   );
// };

// export default Landing;

import React from "react";
import SignInComponent from "./SignInComponent";
import "./Landing.css";

const LandingTwo = props => {
  return (
    <div className="background">
      <div className="background2x">
        <div className="LOHeadDiv">
          <div className="ClarityDiv">
            <h1 className="title">Neighborhood Library</h1>

            <h2 className="title2">Read Great Books In Your Area</h2>
          </div>
          <div className="Signin-Btn" />
          <SignInComponent routerProps={props} />
          <div className="arrowSection">
          <i className="arrow down"></i>
          </div>
        </div>
        <div>
          <div className="halfBackground">

            <p className="halfblurb">Providing our users with a simple and <br/>feature-rich solution for lending and borrowing from their neighbors!</p>
            <div className="services">
              <p className="serviceOne">
                Share books with neighbors, our platform <br /> let's you loan
                out books <br /> from your personal collection.
              </p>
              <img
                className="serviceOneImg"
                src={require("../assets/book_lover.png")}
                alt="bookShelf"
              />
            </div>
            <div className="services">
              <p className="serviceOne">
                Create your own digital library for <br /> others to see and
                borrow books from.
              </p>
              <img
                className="serviceOneImg"
                src={require("../assets/Books.png")}
                alt="createLibrary"
              />
            </div>
            <div className="services">
              <p className="serviceOne">
                Communicate via email to <br /> set a place and time to exchange
                books.
              </p>
              <img
                className="serviceOneImg"
                src={require("../assets/conversation.png")}
                alt="meetup"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingTwo;

