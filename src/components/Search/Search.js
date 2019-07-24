import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import styled from "styled-components";

const MapContainer = styled.div`
  margin: auto;
  width: 75vw;
  height: 75vh;
`;

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 40.712776, lng: -74.005974 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Search() {
  return (
    <MapContainer>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCi5wZjD4l6a21sBpeJM_jLEmWwUtqvucQ`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </MapContainer>
  );
}
