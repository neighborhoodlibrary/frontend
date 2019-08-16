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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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
  const alert = useAlert();
  //
  const firebaseRef = firebase.database().ref("coordinates");
  const geoFire = new GeoFire(firebaseRef);

  const [markerPosition, setMarkerPosition] = useState({});
  const [defaultCenter, setDefaultCenter] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(0);
  const [locationModal, setLocationModal] = useState(false);

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

  const toggleLocationModal = () => {
    locationModal ? setLocationModal(false) : setLocationModal(true);
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
            <Button onClick={toggleLocationModal}>Submit Location</Button>
          </CardFooter>
        </Card>
        <Modal isOpen={locationModal} toggle={toggleLocationModal} centered>
          <ModalHeader>Set Location</ModalHeader>
          <ModalBody>
            Are you sure you want to set your personal library to this location?
          </ModalBody>
          <ModalFooter>
            <Button onClick={submitCoordinates}>Confirm</Button>
            <Button onClick={toggleLocationModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Col>
    </ContainerDiv>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCi5wZjD4l6a21sBpeJM_jLEmWwUtqvucQ"
})(MapComponent);
