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
import { useAlert } from "react-alert";
import { GeoFire } from "geofire";
import Book from "../Shelf/Book";

const ContainerDiv = styled.div`
  max-width: 98vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
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
const mapStyle = {
  height: "55vh",
  width: "40vw"
};
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 870px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const Search = props => {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const alert = useAlert();
  const docRef = firebase.firestore().collection("books");
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
  //
  const [activeMarker, setActiveMarker] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  //
  const [booksArray, setBooksArray] = useState([]);

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
    let searchDistance = distanceValue;
    if (searchDistance === "Global") {
      searchDistance = 3958.8;
    }
    const radiusInKm = searchDistance * 1.60934;
    const geoQuery = geoFire.query({
      center: [defaultCenter.lat, defaultCenter.lng],
      radius: radiusInKm
    });
    const results = [];
    geoQuery.on("key_entered", (key, location, distance) => {
      if (key !== user.uid)
        results.push({
          userId: key,
          lat: location[0],
          lng: location[1],
          distance: distance * 0.621371
        });
    });
    geoQuery.on("ready", () => {
      if (results.length === 0) {
        setResultsArray([]);
        alert.error("No personal libraries in your search distance.");
      } else {
        setResultsArray(results);
      }
    });
  };

  const onMapClick = () => {
    if (showingInfoWindow === true) {
      setShowingInfoWindow(false);
      setActiveMarker({});
    }
  };

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const searchBooksFunc = () => {
    let tempBooksArr = [];
    async function asyncForEach(arr, cb) {
      for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i, arr);
      }
    }
    const aFunc = async () => {
      await asyncForEach(resultsArray, async user => {
        let userId = user.userId;
        await docRef
          .where("ownerId", "==", userId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let book = doc.data();
              tempBooksArr.push(book);
            });
          });
      });
      setBooksArray(tempBooksArr);
    };
    aFunc();
  };

  return (
    <ContainerDiv>
      <Col xs="12" md="6">
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
        <Map
          google={props.google}
          center={defaultCenter}
          zoom={defaultZoom}
          style={mapStyle}
          onClick={onMapClick}
        >
          <Marker position={markerPosition} />
          {resultsArray.length > 0
            ? resultsArray.map(result => (
                <Marker
                  key={Math.random()}
                  position={{ lat: result.lat, lng: result.lng }}
                  name={result.distance}
                  onClick={onMarkerClick}
                />
              ))
            : ""}
          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <p>
              Distance from your location:{" "}
              {Math.round(activeMarker.name * 100) / 100} miles
            </p>
          </InfoWindow>
        </Map>
      </Col>
      <Col xs="12" md="6">
        <div>Book results</div>
        <Button onClick={searchBooksFunc}>Search for Books</Button>
        <Container>
          {booksArray.map(book => (
            <Book key={Math.random()} book={book} />
          ))}
        </Container>
      </Col>
    </ContainerDiv>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyCi5wZjD4l6a21sBpeJM_jLEmWwUtqvucQ"
})(Search);
