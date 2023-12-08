import Cookies from 'js-cookie';
import Map, { MapRef } from 'react-map-gl';
import { useRef, useCallback } from 'react';
import { useEffect, useState } from 'react';
import MapSearch from './MapSearch';
import { mapLocationConfirmationStore } from '../../../zustand/MapHooks';

function MapMissingAnimal() {
  const token = Cookies.get('token');

  const [mapToken, setMapToken] = useState('');
  const mapRef = useRef<MapRef | null>(null);

  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  const getZustandLocationConfirmation = mapLocationConfirmationStore(
    state => state.location
  );

  const onSelectCity = useCallback(
    (ev: number[]): void => {
      console.log(ev);
      mapRef.current?.flyTo({
        center: [ev[0], ev[1]],
        duration: 3500,
      });
    },
    [getZustandLocationConfirmation, mapToken]
  );
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
    setViewState({
      longitude: getZustandLocationConfirmation.center[0] || 18.643501,
      latitude: getZustandLocationConfirmation.center[1] || 60.128161,
      zoom: 18,
    });
  }, [getZustandLocationConfirmation, mapToken]);
  return (
    <>
      {mapToken && (
        <>
          <MapSearch
            onSelectCity={onSelectCity}
            token={token}
            mapToken={mapToken}
          />
          <Map
            ref={mapRef}
            mapLib={import('mapbox-gl')}
            initialViewState={{
              longitude: getZustandLocationConfirmation.center[0] || 18.643501,
              latitude: getZustandLocationConfirmation.center[1] || 60.128161,
              zoom: 9,
            }}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            onClick={e => console.log(e)}
            // onMouseMove={e => console.log(e)}
            mapboxAccessToken={mapToken}
            style={{ height: '100dvh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          />
        </>
      )}
    </>
  );
}
export default MapMissingAnimal;
