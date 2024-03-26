/* eslint-disable-next-line */
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
/* eslint-disable-next-line */
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
/* eslint-disable-next-line */
function MapComponent({ kmlUrl, center, zoom }) {
  useEffect(() => {
    // Load KML layer
    const kmlLayer = new window.L.KML(kmlUrl);
    /* eslint-disable-next-line */
    kmlLayer.addTo(map);

    return () => {
      // Clean up when component unmounts /* eslint-disable-next-line */
      /* eslint-disable-next-line */
      map.removeLayer(kmlLayer);
    };
  }, [kmlUrl]);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default MapComponent;
