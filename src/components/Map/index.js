/* eslint-disable-next-line */
import React from 'react';
import MapComponent from './curomMap.js';
import MapKML from '../../../src/assets/Map.kml'

const CustomMap = () => {
  const kmlUrl = {MapKML}
  const center = [51.505, -0.09]; // Set your initial map center
  const zoom = 13; // Set your initial zoom level

  return (
    <div>
      <h1>Your React App</h1>
      <MapComponent kmlUrl={kmlUrl} center={center} zoom={zoom} />
    </div>
  );
};

export default CustomMap;
