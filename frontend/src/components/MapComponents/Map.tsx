import Map from 'react-map-gl';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function MapMissingAnimal() {
  const token = Cookies.get('token');
  const tokenFunction = async () => {
    console.log(token);
    const response = await fetch('http://localhost:8080/api/auth/map', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    tokenFunction();
  }, []);
  return (
    <Map
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      mapboxAccessToken={token}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}
export default MapMissingAnimal;
