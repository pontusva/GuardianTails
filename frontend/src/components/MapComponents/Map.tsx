import Map from 'react-map-gl';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import MapSearch from './MapSearch';

function MapMissingAnimal() {
  const token = Cookies.get('token');
  const [mapToken, setMapToken] = useState('');

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

  useEffect(() => {
    tokenFunction();
    console.log(mapToken);
  }, [mapToken]);
  return (
    <>
      {mapToken && (
        <>
          <MapSearch token={token} mapToken={mapToken} />
          <Map
            mapLib={import('mapbox-gl')}
            initialViewState={{
              longitude: 18.643501,
              latitude: 60.128161,
              zoom: 9,
            }}
            // onMouseMove={e => console.log(e)}
            mapboxAccessToken={mapToken}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          />
        </>
      )}
    </>
  );
}
export default MapMissingAnimal;
