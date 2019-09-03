import React from "react";
import SignInComponent from "./SignInComponent";
import "./Landing.css";
import styled from "styled-components";
import bgImage from "../assets/neighborpic2.jpg";

const LandingDiv = styled.div`
  box-sizing: border-box;
`;
const BgHold = styled.div`
  background-image: url(${bgImage});
  height: 62rem;
  width: 100%;
  position: absolute;
  z-index: -1;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  -webkit-filter: blur(2px);
`;
const TopOfBg = styled.div`
  height: 50rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  justify-content: stretch;
`;
const LandingHeaderText = styled.div`
  font-family: "Merriweather", serif;
  color: rgba(250, 250, 250, 0.95);
  text-align: center;
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.6);
  border-top: 2px solid rgb(0, 0, 0, 0.4);
  border-bottom: 2px solid rgb(0, 0, 0, 0.4);
  h1 {
    font-size: 4em;
    @media (max-width: 800px) {
      font-size: 3em;
    }
    @media (max-width: 500px) {
      font-size: 2.5em;
    }
  }
  h2 {
    font-size: 1.75em;
    @media (max-width: 800px) {
      font-size: 1.25em;
    }
    @media (max-width: 500px) {
      font-size: 1em;
    }
  }
`;
const ArrowSection = styled.div`
  height: 7rem;
`;
const Arrow = styled.div`
  border: solid rgba(250, 250, 250, 0.9);
  border-width: thick;
  border-width: 0 2px 2px 0;
  display: flex;
  padding: 1.5rem;
  height: 1rem;
  transform: rotate(45deg);
`;
const HalfBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  height: 45rem;
  box-sizing: border-box;
`;
const HalfBlurb = styled.p`
  color: black;
  font-size: 1.6rem;
  text-align: center;
  font-family: "Merriweather", serif;
  padding-bottom: 4rem;
  padding-top: 2rem;
  box-sizing: border-box;
  margin: 0 1rem;
`;
const Services = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.2rem;
  font-family: "Merriweather", serif;
  margin-bottom: 2rem;
  text-align: left;
`;
const ServiceText = styled.p`
  display: flex;
  justify-content: left;
  color: black;
`;
const ServiceImg = styled.img`
  height: 10rem;
`;

const LandingTwo = props => {
  return (
    <LandingDiv>
      <BgHold />
      <TopOfBg>
        <LandingHeaderText>
          <h1>Neighborhood Library</h1>
          <h2>Read Great Books In Your Area</h2>
        </LandingHeaderText>
        <SignInComponent routerProps={props} />
        <ArrowSection>
          <Arrow />
        </ArrowSection>
      </TopOfBg>
      <HalfBackground>
        <HalfBlurb>
          Providing our users with a simple and <br />
          feature-rich solution for lending and borrowing from their neighbors!
        </HalfBlurb>
        <Services>
          <ServiceText>
            Share books with neighbors, our platform <br /> let's you loan out
            books <br /> from your personal collection.
          </ServiceText>
          <ServiceImg
            src={require("../assets/book_lover.png")}
            alt="bookShelf"
          />
        </Services>
        <Services>
          <ServiceText>
            Create your own digital library for <br /> others to see and borrow
            books from.
          </ServiceText>
          <ServiceImg
            src={require("../assets/Books.png")}
            alt="createLibrary"
          />
        </Services>
        <Services>
          <ServiceText>
            Communicate via email to <br /> set a place and time to exchange
            books.
          </ServiceText>
          <ServiceImg
            src={require("../assets/conversation.png")}
            alt="meetup"
          />
        </Services>
      </HalfBackground>
    </LandingDiv>
  );
};

export default LandingTwo;

// import React from "react";
// import SignInComponent from "./SignInComponent";
// import "./Landing.css";
// const LandingTwo = props => {
//   return (
//     <div className="landingDiv">
//       <div className="bghold" />
//         <div className="topofBG">
//           <div className="landingHeaderText">
//             <h1>Neighborhood Library</h1>
//             <h2>Read Great Books In Your Area</h2>
//           </div>
//           <SignInComponent routerProps={props} />
//             <div className="arrowSection">
//               <i className="arrow down"></i>
//             </div>
//         </div>
//         <div>
//           <div className="halfBackground">

//             <p className="halfblurb">Providing our users with a simple and <br/>feature-rich solution for lending and borrowing from their neighbors!</p>
//             <div className="services">
//               <p className="serviceOne">
//                 Share books with neighbors, our platform <br /> let's you loan
//                 out books <br /> from your personal collection.
//               </p>
//               <img
//                 className="serviceOneImg"
//                 src={require("../assets/book_lover.png")}
//                 alt="bookShelf"
//               />
//             </div>
//             <div className="services">
//               <p className="serviceOne">
//                 Create your own digital library for <br /> others to see and
//                 borrow books from.
//               </p>
//               <img
//                 className="serviceOneImg"
//                 src={require("../assets/Books.png")}
//                 alt="createLibrary"
//               />
//             </div>
//             <div className="services">
//               <p className="serviceOne">
//                 Communicate via email to <br /> set a place and time to exchange
//                 books.
//               </p>
//               <img
//                 className="serviceOneImg"
//                 src={require("../assets/conversation.png")}
//                 alt="meetup"
//               />
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// };

// export default LandingTwo;
