import React, { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
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
const LookupContainerDiv = styled.div`
  flex-direction: row;
`;
const SliderContainerDiv = styled.div`
  margin-bottom: 2rem;
`;
const MapContainerDiv = styled.div`
  width: 20vw;
  height: 40vh;
  align-self: flex-start;
`;

const Search = props => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const db = firebase.firestore();
  const userDocRef = db.collection("users").doc(user.uid);
  //
  const firebaseRef = firebase.database().ref("coordinates");
  const geoFire = new GeoFire(firebaseRef);
  //
  const [defaultCenter, setDefaultCenter] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(0);
  const [markerPosition, setMarkerPosition] = useState({});

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
    //     console.log(
    //   if (doc.exists) {
    //     if (doc.data().coordinates) {
    //       setDefaultCenter({
    //         lat: Number(doc.data().coordinates.latitude),
    //         lng: Number(doc.data().coordinates.longitude)
    //       });
    //       setDefaultZoom(13);
    //       setMarkerPosition({
    //         lat: Number(doc.data().coordinates.latitude),
    //         lng: Number(doc.data().coordinates.longitude)
    //       });
    //     }
    //   } else {
    //     console.log("No such document!");
    //   }
    // })
    // .catch(error => {
    //   console.log("Error getting the document:", error);
    // });
  }, {});

  useEffect(() => {
    switch (sliderValue.x) {
      case 0.1:
        setDistanceValue(".5");
        break;
      case 0.2:
        setDistanceValue("1");
        break;
      case 0.3:
        setDistanceValue("2");
        break;
      case 0.4:
        setDistanceValue("4");
        break;
      case 0.5:
        setDistanceValue("8");
        break;
      case 0.6:
        setDistanceValue("16");
        break;
      case 0.7:
        setDistanceValue("32");
        break;
      case 0.8:
        setDistanceValue("64");
        break;
      case 0.9:
        setDistanceValue("128");
        break;
      case 1.0:
        setDistanceValue("Global");
        break;
      default:
        break;
    }
  });

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

  return (
    <ContainerDiv>
      <Col xs="12" md="6">
        <LookupContainerDiv>
          <Form>
            <Label tag="h5">Search For Books</Label>
            <InputGroup>
              <Input type="text" />
              <InputGroupAddon addonType="append">
                <Button>Submit</Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </LookupContainerDiv>
        <SliderContainerDiv>
          <h5>
            Choose desired distance to search for other personal libraries.
          </h5>
          <div>{`Distance: ${distanceValue} ${
            distanceValue === "Global" ? "search" : "miles"
          }`}</div>
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
        <MapContainerDiv>
          <Map google={props.google} center={defaultCenter} zoom={defaultZoom}>
            <Marker position={markerPosition} />
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
