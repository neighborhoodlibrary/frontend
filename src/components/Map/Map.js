import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";
import { compose, withProps } from "recompose";
import styled from "styled-components";

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button
} from "reactstrap";

import firebase from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";

const ContainerDiv = styled.div`
  max-width: 98vw;
  display: flex;
  justify-content: space-around;
`;

const MapContainer = styled.div`
  margin: auto;
  width: 50vw;
  height: 75vh;
`;

export default function Map() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const db = firebase.firestore();
  const userDocRef = db.collection("users").doc(user.uid);
  const alert = useAlert();

  const [markerPosition, setMarkerPosition] = useState({});
  const [isMarkerShown, setIsMarkerShown] = useState(false);
  const [defaultCenter, setDefaultCenter] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(0);

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
  }, []);

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
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      onClick={handleMarkerClick}
    >
      {isMarkerShown && <Marker position={markerPosition} />}
    </GoogleMap>
  ));

  const handleMarkerClick = e => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMarkerPosition({
      lat,
      lng
    });
    setIsMarkerShown(true);
    setDefaultCenter({ lat, lng });
    setDefaultZoom(13);
  };

  const submitCoordinates = () => {
    if (markerPosition.lat && markerPosition.lng) {
      return db.runTransaction(transaction => {
        return transaction
          .get(userDocRef)
          .then(userDoc => {
            console.log(userDoc);
            if (!userDoc) {
              throw "Doc does not exist.";
            }
            const newCoordinates = new firebase.firestore.GeoPoint(
              markerPosition.lat,
              markerPosition.lng
            );
            transaction.update(userDocRef, { coordinates: newCoordinates });
          })
          .then(() => {
            console.log("Transaction successfully committed!");
            alert.success("Transaction successfully committed!");
          })
          .catch(error => {
            console.log("Transaction failed: ", error);
            alert.error("Transaction failed");
          });
      });
    } else {
      alert.error("Must select a marker before submission.");
    }
  };

  return (
    <ContainerDiv>
      <Col xs="12" md="6">
        <MapContainer>
          <MapComponent />
        </MapContainer>
      </Col>
      <Col xs="12" md="4">
        <Card>
          <CardHeader tag="h3">Set-Up Personal Library Location</CardHeader>
          <CardBody>
            <CardTitle>
              <b>Please click on the map to create a marker</b>
            </CardTitle>
            <CardText>
              This will return coordinates to initialize your personal library
              location
            </CardText>
            <CardText>
              <b>Latitude:</b>
              {markerPosition.lat
                ? `  ${markerPosition.lat}`
                : " No marker initialized"}
            </CardText>
            <CardText>
              <b>Longitude:</b>
              {markerPosition.lng
                ? `  ${markerPosition.lng}`
                : " No marker initialized"}
            </CardText>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={submitCoordinates}>
              Submit Location
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </ContainerDiv>
  );
}
