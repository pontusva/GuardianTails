import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import ChevronDown from '../../svgs/ChevronDown';
import { useEffect, useRef } from 'react';

interface Props {
  // userChosenLocation: unknown[];
  result: unknown[] | undefined;
}

export default function MapSearchResultDropdown({ result }: Props) {
  const inputRef = useRef<HTMLButtonElement | null>(null);
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
                  {' '}
                  <MenuItem>{item.place_name}</MenuItem>
                </div>
              ))}
          </MenuList>
        </Menu>
      )}
    </>
  );
}
