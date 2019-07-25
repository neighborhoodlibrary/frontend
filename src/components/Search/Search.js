import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";
import { compose, withProps } from "recompose";
import firebase from "../../firebase/firebase.utils";
import styled from "styled-components";

//

const ContainerDiv = styled.div`
  max-width: 98vw;
  display: flex;
`;
const MapContainerDiv = styled.div`
  width: 20vw;
  height: 40vh;
  align-self: flex-start;
`;

const Search = () => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const db = firebase.firestore();
  const userDocRef = db.collection("users").doc(user.uid);
  //
  const [defaultCenter, setDefaultCenter] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(0);
  const [markerPosition, setMarkerPosition] = useState({});
  const [isMarkerShown, setIsMarkerShown] = useState(false);

  useEffect(() => {
    setDefaultCenter({
      lat: 39.11599111031897,
      lng: -95.63578119495679
    });
    setDefaultZoom(4);
    userDocRef
      .get()
      .then(doc => {
        if (doc.exists) {
          if (doc.data().coordinates) {
            setDefaultCenter({
              lat: Number(doc.data().coordinates.latitude),
              lng: Number(doc.data().coordinates.longitude)
            });
            setDefaultZoom(13);
            setMarkerPosition({
              lat: Number(doc.data().coordinates.latitude),
              lng: Number(doc.data().coordinates.longitude)
            });
            setIsMarkerShown(true);
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting the document:", error);
      });
  }, {});

  const MapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCi5wZjD4l6a21sBpeJM_jLEmWwUtqvucQ",
      loadingElement: <div style={{ height: "100%" }} />,
      containerElement: <div style={{ height: "100%" }} />,
      mapElement: <div style={{ height: "100%" }} />
    }),
    withScriptjs,
    withGoogleMap
  )(() => (
    <GoogleMap defaultCenter={defaultCenter} defaultZoom={defaultZoom}>
      {isMarkerShown && <Marker position={markerPosition} />}
    </GoogleMap>
  ));

  return (
    <ContainerDiv>
      <MapContainerDiv>
        <MapComponent />
      </MapContainerDiv>
    </ContainerDiv>
  );
};

export default Search;
