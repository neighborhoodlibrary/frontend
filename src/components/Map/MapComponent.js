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
  ModalFooter,
  InputGroup,
  Input,
  InputGroupAddon
} from "reactstrap";
import firebase from "../../firebase/firebase.utils";
import { useAlert } from "react-alert";
import { GeoFire } from "geofire";
import Geocode from "react-geocode";

const mapApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const ContainerDiv = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const MapContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
  border-radius: 2px;
`;

const CardHolder = styled.div`
  box-sizing: border-box;
  margin: 10px;
`

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
  const [addressValue, setAddressValue] = useState("");

  const handleChanges = e => {
    setAddressValue(e.target.value);
  };

  const submitAddress = () => {
    Geocode.fromAddress(addressValue)
      .then(res => {
        const { lat, lng } = res.results[0].geometry.location;
        setMarkerPosition({
          lat,
          lng
        });
        setDefaultCenter({ lat, lng });
        setDefaultZoom(14);
      })
      .catch(error => {
        alert.error("No results found");
        console.log(error);
      });
  };

  useEffect(() => {
    Geocode.setApiKey(mapApiKey);
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
        <CardHolder>
          <Card>
            <CardHeader tag="h3">Set-Up Personal Library Location</CardHeader>
            <CardBody>
              <CardTitle>
                <b>Please click on the map to create a marker</b>
              </CardTitle>
              <CardText>
                This will set the coordinates to initialize your personal library
                location
              </CardText>
              <CardTitle>
                <b>
                  Or if you would like, input an address and click set address
                </b>
              </CardTitle>
              <div>
                <InputGroup>
                  <Input
                    name="addressValue"
                    value={addressValue}
                    onChange={handleChanges}
                    type="text"
                    placeholder="input address"
                  />
                  <InputGroupAddon addonType="append">
                    <Button onClick={submitAddress}>Set Address</Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <CardText>
                Then click submit location to finalize the location of your
                personal library
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
        </CardHolder>
    </ContainerDiv>
  );
};

export default GoogleApiWrapper({
  apiKey: mapApiKey
})(MapComponent);
