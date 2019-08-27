import React from "react";
import SignInComponent from "./SignInComponent";
import "./Landing.css";

const LandingTwo = props => {
  return (
    <div className="landingDiv">
      <div className="bghold" />
        <div className="topofBG">
          <div className="landingHeaderText">
            <h1>Neighborhood Library</h1>
            <h2>Read Great Books In Your Area</h2>
          </div>
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
                src={require("../assets/library.jpg")}
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
                src={require("../assets/createLibrary.jpg")}
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
                src={require("../assets/meetup.jpg")}
                alt="meetup"
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default LandingTwo;

