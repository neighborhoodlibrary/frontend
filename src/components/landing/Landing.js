import React from "react";
import SignInComponent from "./SignInComponent";
import styled from "styled-components";
// import bgImage from "../../assets/neighborpic2.jpg";
import bgImage from "../../assets/landbg.jpg"

const LandingDiv = styled.div`
  box-sizing: border-box;
`;
const BgHold = styled.div`
  background-image: url(${bgImage});
  height: 650px;
  width: 100%;
  position: absolute;
  z-index: -1;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  -webkit-filter: blur(2px);
`;
const TopOfBg = styled.div`
  height: 650px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
`;
const LandingHeaderText = styled.div`
  font-family: "Merriweather", serif;
  color: rgba(250, 250, 250, 0.95);
  text-align: center;
  width: 100%;
  height: 172px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.6);
  border-top: 2px solid rgb(0, 0, 0, 0.4);
  border-bottom: 2px solid rgb(0, 0, 0, 0.4);

  h1 {
    font-size: 3.5em;
    @media (max-width: 800px) {
      font-size: 3em;
    }
    @media (max-width: 500px) {
      font-size: 2.5em;
    }
  }
  h2 {
    font-size: 1.5em;
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
  height: 30px;
  transform: rotate(45deg);
`;
const HalfBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-sizing: border-box;
  background: rgb(127,173,80);
  background: linear-gradient(90deg, rgba(127,173,80,1) 55%, rgba(255,255,255,1) 60%);

  @media(max-width: 800px) {
    background: rgb(127,173,80);
  }
`;
const HalfBlurb = styled.p`
  color: rgb(60,60,60);
  height: 300px;
  background-color: rgb(222,222,222);
  width: 100%;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Merriweather", serif;
  box-sizing: border-box;
`;

const ServiceHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(127,173,80);
  box-sizing: border-box;
`;

const Services = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-family: "Merriweather", serif;
  box-sizing: border-box;
  background: rgb(127,173,80);
  background: linear-gradient(90deg, rgba(127,173,80,1) 55%, rgba(255,255,255,1) 60%);

  @media(max-width: 800px){
    flex-direction: column;
    background: rgb(127,173,80);
  }
`;
const ServiceText = styled.p`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-left: 40px;
  color: white;

  @media(max-width: 800px){
    color: white;
    background-color: rgb(127,173,80);
    padding: 20px;
    text-align: center;
  }
`;
const ServiceImg = styled.img`
  width: 325px;

  @media(max-width: 800px){
    flex-direction: column;
    width: 75%;
    margin: auto;
    padding: 10px;
  }
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
        <ServiceHolder>
          <Services>
            <ServiceText>
              Share books with neighbors, our platform <br /> let's you loan out
              books <br /> from your personal collection.
            </ServiceText>
            <ServiceImg
              src={require("../../assets/book_lover.png")}
              alt="bookShelf"
            />
          </Services>
          <Services>
            <ServiceText>
              Create your own digital library for <br /> others to see and borrow
              books from.
            </ServiceText>
            <ServiceImg
              src={require("../../assets/Books.png")}
              alt="createLibrary"
            />
          </Services>
          <Services>
            <ServiceText>
              Communicate via email to <br /> set a place and time to exchange
              books.
            </ServiceText>
            <ServiceImg
              src={require("../../assets/conversation.png")}
              alt="meetup"
            />
          </Services>
        </ServiceHolder>
      </HalfBackground>
    </LandingDiv>
  );
};

export default LandingTwo;
