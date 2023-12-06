import { useLocation, NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

export default function Navigation() {
  const location = useLocation();
  const dontShowNavigation = ['/login', '/register'];
  if (dontShowNavigation.includes(location.pathname)) return null;

  return (
    <div>
      <ChakraLink as={NavLink} to="/login">
        Home
      </ChakraLink>
    </div>
  );
}
