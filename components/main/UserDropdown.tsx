import React, { useState , Fragment} from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Transition } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import useAuth from '../../utils/useAuth';
import { AccountIcon, SettingsIcon, LogoutIcon } from "../icon/Icons";

function DropdownMenu() {
  const { logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
      <MenuButton
        as={Button}
        variant="ghost"
        rightIcon={<ChevronDownIcon />}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Me
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setMenuOpen(false)}>
          <Link href="/settings">Settings</Link>
        </MenuItem>
        {isAuthenticated() && (
          <MenuItem onClick={() => { logout(); setMenuOpen(false); }}>Logout</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default DropdownMenu;
