import Map from 'react-map-gl';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function MapMissingAnimal() {
  const token = Cookies.get('token');
  const [mapToken, setMapToken] = useState('');
  console.log(token);
  const tokenFunction = async () => {
    const response = await fetch('http://localhost:8080/api/auth/map', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    setMapToken(result);
  };
  tokenFunction();
  useEffect(() => {
    console.log(mapToken);
  }, [mapToken]);
  return (
    <>
      {mapToken && (
        <Map
          mapLib={import('mapbox-gl')}
          initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3.5,
          }}
          mapboxAccessToken={mapToken}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      )}
    </>
  );
}
export default MapMissingAnimal;
