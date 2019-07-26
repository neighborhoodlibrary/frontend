import React, { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
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
import { GeoFire } from "geofire";

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

const MapComponent = props => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const db = firebase.firestore();
  const userDocRef = db.collection("users").doc(user.uid);
  const alert = useAlert();
  //
  const firebaseRef = firebase.database().ref("coordinates");
  const geoFire = new GeoFire(firebaseRef);

  const [markerPosition, setMarkerPosition] = useState({});
  const [defaultCenter, setDefaultCenter] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(0);

  useEffect(() => {
    setDefaultCenter({
      lat: 39.11599111031897,
      lng: -95.63578119495679
    });
    setDefaultZoom(4);
    geoFire.get(user.uid).then(
      location => {
        if (location) {
          setDefaultCenter({
            lat: Number(location[0]),
            lng: Number(location[1])
          });
          setDefaultZoom(13);
          setMarkerPosition({
            lat: Number(location[0]),
            lng: Number(location[1])
          });
        } else {
          console.log("Provided key is not in GeoFire");
        }
      },
      error => {
        console.log("Error: " + error);
      }
    );
    // userDocRef
    //   .get()
    //   .then(doc => {
    //     if (doc.exists) {
    //       if (doc.data().coordinates) {
    //         setDefaultCenter({
    //           lat: Number(doc.data().coordinates.latitude),
    //           lng: Number(doc.data().coordinates.longitude)
    //         });
    //         setDefaultZoom(14);
    //         setMarkerPosition({
    //           lat: Number(doc.data().coordinates.latitude),
    //           lng: Number(doc.data().coordinates.longitude)
    //         });
    //       }
    //     } else {
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch(error => {
    //     console.log("Error getting the document:", error);
    //   });
  }, []);

  const handleMapClick = (mapProps, map, e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMarkerPosition({
      lat,
      lng
    });
    setDefaultCenter({ lat, lng });
    setDefaultZoom(14);
  };

  const submitCoordinates = () => {
    if (markerPosition.lat && markerPosition.lng) {
      geoFire.set(user.uid, [markerPosition.lat, markerPosition.lng]).then(
        () => {
          alert.success("Transaction successfully committed!");
        },
        error => {
          console.log("Error:" + error);
          alert.error(error);
        }
      );
      // return db.runTransaction(transaction => {
      //   return transaction
      //     .get(userDocRef)
      //     .then(userDoc => {
      //       console.log(userDoc);
      //       if (!userDoc) {
      //         throw "Doc does not exist.";
      //       }
      //       const newCoordinates = new firebase.firestore.GeoPoint(
      //         markerPosition.lat,
      //         markerPosition.lng
      //       );
      //       transaction.update(userDocRef, { coordinates: newCoordinates });
      //     })
      //     .then(() => {
      //       console.log("Transaction successfully committed!");
      //       alert.success("Transaction successfully committed!");
      //     })
      //     .catch(error => {
      //       console.log("Transaction failed: ", error);
      //       alert.error("Transaction failed");
      //     });
      // });
    } else {
      alert.error("Must select a marker before submission.");
    }
  };

  return (
    <ContainerDiv>
      <Col xs="12" md="6">
        <MapContainer>
          <Map
            google={props.google}
            center={defaultCenter}
            zoom={defaultZoom}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} />
          </Map>
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
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCi5wZjD4l6a21sBpeJM_jLEmWwUtqvucQ"
})(MapComponent);
