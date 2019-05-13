import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

const PigeonMap = () => (
  <Map
    center={[50.879, 4.6997]}
    zoom={12}
    metaWheelZoom
  >
    <Marker
      anchor={[50.874, 4.6947]}
      payload={1}
      onClick={({ event, anchor, payload }) => {}}
    />
  </Map>
);

export default PigeonMap;
