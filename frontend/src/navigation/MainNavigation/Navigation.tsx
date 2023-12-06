import { useLocation } from 'react-router-dom';
import HamburgerMenu from '../../svgs/HamburgerMenu';
import { useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
} from '@chakra-ui/react';

import { UserCenter } from './MainComponents/UserNavigation';

export default function Navigation() {
  const location = useLocation();
  const dontShowNavigation = ['/login', '/register'];
  if (dontShowNavigation.includes(location.pathname)) return null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex justify-between">
        <UserCenter />
        <div>
          <Button ref={btnRef} onClick={onOpen}>
            <HamburgerMenu />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create your account</DrawerHeader>
              <DrawerBody>
                <Input placeholder="Type here..." />
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}
