import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import ChevronDown from '../../svgs/ChevronDown';
import { useEffect, useRef } from 'react';
import { mapLocationConfirmationStore } from '../../../zustand/MapHooks';
import { LngLatLike } from 'mapbox-gl';
interface Props {
  // userChosenLocation: unknown[];
  result: unknown[] | undefined;
  onSelectCity: (lngLatArray: LngLatLike) => void;
}

export default function MapSearchResultDropdown({
  result,
  onSelectCity,
}: Props) {
  const inputRef = useRef<HTMLButtonElement | null>(null);

  const setZustandLocationConfirmation = mapLocationConfirmationStore(
    state => state.updateLocation
  );

  useEffect(() => {
    result && result.length > 0 && inputRef.current && inputRef.current.click();
  }, [result]);

  return (
    <>
      {result && (
        <Menu>
          <MenuButton ref={inputRef} as={Button} rightIcon={<ChevronDown />}>
            Välj område
          </MenuButton>
          <MenuList>
            {result &&
              result.map((item: any) => (
                <div key={item.place_name}>
                  <MenuItem
                    onClick={() => {
                      onSelectCity(item.center);
                      setZustandLocationConfirmation(item);
                    }}>
                    {item.place_name}
                  </MenuItem>
                </div>
              ))}
          </MenuList>
        </Menu>
      )}
    </>
  );
}
