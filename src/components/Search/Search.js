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

export default function Search() {
  const [markerPosition, setMarkerPosition] = useState({});
  const [isMarkerShown, setIsMarkerShown] = useState(false);
  const [defaultCenter, setDefaultCenter] = useState({});
  const [defaultZoom, setDefaultZoom] = useState(0);

  useEffect(() => {
    setDefaultCenter({
      lat: 40.712776,
      lng: -74.005974
    });
    setDefaultZoom(10);
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
    setIsMarkerShown(true);
    setMarkerPosition({
      lat,
      lng
    });
    setDefaultCenter({ lat, lng });
    setDefaultZoom(12.5);
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
            <Button color="primary">Submit Location</Button>
          </CardFooter>
        </Card>
      </Col>
    </ContainerDiv>
  );
}
