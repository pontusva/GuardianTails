import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import HamburgerMenu from '../../svgs/HamburgerMenu';
import Cookies from 'js-cookie';
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
  MenuItem,
  Menu,
  Divider,
  Input,
  Button,
} from '@chakra-ui/react';

export default function Navigation() {
  const location = useLocation();
  const dontShowNavigation = ['/login', '/register'];
  if (dontShowNavigation.includes(location.pathname)) return null;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  console.log(Cookies.get('token'));
  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  const menuItems = [
    'My Lost Pets',
    'Pet Alerts',
    'Community Searches',
    'PetBuddy Guide',
    'Find a Lost Pet',
  ];

  return (
    <>
      <div className="flex justify-end">
        <div>
          <Button width={20} height={20} ref={btnRef} onClick={onOpen}>
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
              <DrawerHeader>Hello, User</DrawerHeader>
              <div className="flex justify-center">
                <Button onClick={handleLogout} className="mb-1 w-28">
                  Log out
                </Button>
              </div>
              <DrawerBody>
                <Input placeholder="Type here..." />
                <div className="mt-10">
                  <p className="font-mono mb-5 text-center text-2xl">
                    GuardianTails
                  </p>
                  <div className="mb-16">
                    <Menu>
                      {menuItems.map((item, index) => {
                        console.log(item.split(' ').join('-').toLowerCase());
                        return (
                          <MenuItem
                            key={index}
                            as={NavLink}
                            to={item.split(' ').join('-').toLowerCase()}
                            onClick={onClose}>
                            {item}
                          </MenuItem>
                        );
                      })}
                      <Divider />
                      <Divider />
                      <Divider />
                      <Divider />

                      <MenuItem to="/" as={NavLink}>
                        Profile
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                <img src="/basicdragonfly.svg" />
              </DrawerBody>
              <DrawerFooter>
                <div className="flex w-full flex-col items-center">
                  <div className="flex justify-between w-full">
                    <NavLink to="/login">faq</NavLink>
                    <NavLink to="/login">about</NavLink>
                    <NavLink to="/login">contact</NavLink>
                    <NavLink to="/login">gdpr</NavLink>
                  </div>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}
