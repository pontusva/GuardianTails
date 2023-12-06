import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Stack,
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react';
import ChevronDown from '../../../svgs/ChevronDown';
export const UserCenter = () => {
  return (
    <Menu>
      <MenuButton as={Button} className="w-full" rightIcon={<ChevronDown />}>
        Search & Connect
      </MenuButton>
      <MenuList>
        <Stack spacing={2}>
          <MenuItem>My searches</MenuItem>
          <MenuItem>Pet Alerts</MenuItem>
          <MenuItem>Community Searches</MenuItem>
          <Divider />
          {/* <MenuItem>Profile</MenuItem> */}
          <MenuItem>Post a Lost Pet</MenuItem>
        </Stack>
      </MenuList>
    </Menu>
  );
};

export const AdminActions = () => {};
