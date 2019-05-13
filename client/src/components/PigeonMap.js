import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

const PigeonMap = () => (
  <Map
    metaWheelZoom
    center={[50.879, 4.6997]}
    zoom={12}
    onClick={({ event, latLng, pixel }) => console.log(latLng)}
  >
    <Marker
      anchor={[50.874, 4.6947]}
      payload={1}
      onClick={({ event, anchor, pixel }) => console.log(anchor)}
    />
  </Map>
);

export default PigeonMap;
