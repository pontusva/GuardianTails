import Cookies from 'js-cookie';
import Map, { MapRef, LngLatLike } from 'react-map-gl';
import { useRef, useCallback } from 'react';
import { useEffect, useState } from 'react';
import MapSearch from './MapSearch';
import {
  mapLocationConfirmationStore,
  preciseMapLatLng,
} from '../../../zustand/MapHooks';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
} from '@chakra-ui/react';

interface Props {
  isOpenMap: boolean;
  onCloseMap: () => void;
}
// { onOpenMap, isOpenMap, onCloseMap }: Props
function MapMissingAnimal({ onCloseMap, isOpenMap }: Props) {
  const token = Cookies.get('token');
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [mapToken, setMapToken] = useState('');
  const mapRef = useRef<MapRef | null>(null);
  // const { isOpen, onClose } = useDisclosure();
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  const getZustandLocationConfirmation = mapLocationConfirmationStore(
    state => state.location
  );

  const setPreciseMapLatLng = preciseMapLatLng(state => state.update);
  console.log(token);
  const onSelectCity = useCallback(
    (lngLatArray: LngLatLike): void => {
      console.log(lngLatArray);
      mapRef.current?.flyTo({
        center: lngLatArray,
        duration: 3500,
        speed: 0.5,
      });
    },
    [getZustandLocationConfirmation, mapToken]
  );
  const tokenFunction = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/map', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setMapToken(result);
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    tokenFunction();
    setViewState({
      longitude: getZustandLocationConfirmation
        ? getZustandLocationConfirmation.center[0]
        : 18.643501,
      latitude: getZustandLocationConfirmation
        ? getZustandLocationConfirmation.center[1]
        : 60.128161,
      zoom: 14,
    });
  }, [getZustandLocationConfirmation, mapToken]);
  return (
    <>
      <>
        <Drawer
          size="lg"
          onClose={onCloseMap}
          isOpen={isOpenMap}
          placement="right">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <div className=" w-full flex  justify-around items-center ">
                <h1>Välj plats</h1>

                <Button colorScheme="blue" onClick={onCloseMap}>
                  CLOSE
                </Button>
              </div>
            </DrawerHeader>
            <DrawerBody>
              Sök efter platsen du senast såg ditt djur
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
                      longitude: 18.643501,
                      latitude: 60.128161,
                      zoom: 9,
                    }}
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    onClick={e => setPreciseMapLatLng(e.lngLat)}
                    // onMouseMove={e => console.log(e)}
                    mapboxAccessToken={mapToken}
                    style={{ height: '100dvh' }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                  />
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        {/* <ImageUpload nextAction={<ButtonProp onOpen={onOpen} />} /> */}
      </>
    </>
  );
}
export default MapMissingAnimal;
