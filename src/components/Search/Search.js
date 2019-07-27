import React, { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import firebase from "../../firebase/firebase.utils";
import styled from "styled-components";
import Slider from "react-input-slider";
import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Label
} from "reactstrap";
import { GeoFire } from "geofire";

const ContainerDiv = styled.div`
  max-width: 98vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
// const LookupContainerDiv = styled.div`
//   flex-direction: row;
// `;
const DistanceContainerDiv = styled.div`
  display: flex;
  margin: auto;
`;

const ButtonContainerDiv = styled.div`
  margin-top: 0.5rem;
  margin-left: 4rem;
`;

const SliderContainerDiv = styled.div`
  margin-bottom: 2rem;
`;
const MapContainerDiv = styled.div`
  height: 45vh;
  width: 10vw;
  align-self: flex-start;
`;
const mapStyle = {
  width: "90%"
};

const Search = props => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  //
  const firebaseRef = firebase.database().ref("coordinates");
  const geoFire = new GeoFire(firebaseRef);
  //
  const [defaultCenter, setDefaultCenter] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(0);
  const [markerPosition, setMarkerPosition] = useState({});
  const [resultsArray, setResultsArray] = useState([]);

  //
  const [sliderValue, setSliderValue] = useState({ x: 0.1 });
  const [distanceValue, setDistanceValue] = useState("");

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
          setDefaultZoom(15);
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
  }, {});

  useEffect(() => {
    switch (sliderValue.x) {
      case 0.1:
        setDistanceValue(".5");
        setDefaultZoom(15);
        break;
      case 0.2:
        setDistanceValue("1");
        setDefaultZoom(14);
        break;
      case 0.3:
        setDistanceValue("2");
        setDefaultZoom(13);
        break;
      case 0.4:
        setDistanceValue("4");
        setDefaultZoom(12);
        break;
      case 0.5:
        setDistanceValue("8");
        setDefaultZoom(11);
        break;
      case 0.6:
        setDistanceValue("16");
        setDefaultZoom(10);
        break;
      case 0.7:
        setDistanceValue("32");
        setDefaultZoom(9);
        break;
      case 0.8:
        setDistanceValue("64");
        setDefaultZoom(8);
        break;
      case 0.9:
        setDistanceValue("128");
        setDefaultZoom(7);
        break;
      case 1.0:
        setDistanceValue("Global");
        setDefaultZoom(2);
        break;
      default:
        break;
    }
  });

  const populateLibraryFunc = e => {
    e.preventDefault();
    const radiusInKm = distanceValue * 1.60934;
    const geoQuery = geoFire.query({
      center: [defaultCenter.lat, defaultCenter.lng],
      radius: radiusInKm
    });
    // console.log(geoQuery.radius());
    // console.log(geoQuery.center());
    const results = [];
    geoQuery.on("key_entered", (key, location, distance) => {
      console.log(`key: ${key}, location: ${location}, ${distance}`);
      if (key !== user.uid)
        results.push({
          userId: key,
          lat: location[0],
          lng: location[1],
          distance: distance * 0.621371
        });
    });
    geoQuery.on("ready", () => {
      setResultsArray(results);
    });
  };

  // const distanceFunc = () => {
  //   let service = new props.google.maps.DistanceMatrixService();
  //   service.getDistanceMatrix(
  //     {
  //       origins: ["33.86856646331403,-117.92422112861647"],
  //       destinations: ["33.83112823257978,-117.91237843968082"],
  //       travelMode: "DRIVING",
  //       unitSystem: props.google.maps.UnitSystem.IMPERIAL
  //     },
  //     (res, status) => {
  //       console.log(res);
  //       if (status === "OK") {
  //         console.log("ok");
  //       } else {
  //         console.log("Error getting the distances");
  //       }
  //     }
  //   );
  // };
  // distanceFunc();
  console.log(markerPosition);

  return (
    <ContainerDiv>
      <Col xs="12" md="6">
        {/* <LookupContainerDiv>
          <Form>
            <Label tag="h5">Search For Books</Label>
            <InputGroup>
              <Input type="text" />
              <InputGroupAddon addonType="append">
                <Button>Submit</Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </LookupContainerDiv> */}
        <Form>
          <Label tag="h5">
            Choose desired distance to search for other personal libraries.
          </Label>
          <DistanceContainerDiv>
            <SliderContainerDiv>
              <Label tag="h6">{`Distance: ${distanceValue} ${
                distanceValue === "Global" ? "search" : "miles"
              }`}</Label>
              <Slider
                axis="x"
                xstep={0.1}
                xmin={0.1}
                xmax={1}
                x={sliderValue.x}
                onChange={({ x }) =>
                  setSliderValue({ x: parseFloat(x.toFixed(2)) })
                }
              />
            </SliderContainerDiv>
            <ButtonContainerDiv>
              <Button color="primary" onClick={populateLibraryFunc}>
                Populate Libraries
              </Button>
            </ButtonContainerDiv>
          </DistanceContainerDiv>
        </Form>
        <MapContainerDiv>
          <Map
            google={props.google}
            center={defaultCenter}
            zoom={defaultZoom}
            style={mapStyle}
          >
            <Marker position={markerPosition} />

            {resultsArray.length > 0
              ? resultsArray.map(result => (
                  <Marker position={{ lat: result.lat, lng: result.lng }} />
                ))
              : ""}
          </Map>
        </MapContainerDiv>
      </Col>
      <Col xs="12" md="6">
        <div>Book results</div>
      </Col>
    </ContainerDiv>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCi5wZjD4l6a21sBpeJM_jLEmWwUtqvucQ"
})(Search);
