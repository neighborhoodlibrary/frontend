import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";
import { compose, withProps } from "recompose";
import styled from "styled-components";

const MapContainer = styled.div`
  margin: auto;
  width: 75vw;
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

  console.log(markerPosition);
  return (
    <MapContainer>
      <MapComponent />
    </MapContainer>
  );
}
