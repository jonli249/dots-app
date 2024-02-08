import React from 'react';
import Link from 'next/link';
import useAuth from '../../utils/useAuth'; // Import the useAuth hook
import Image from 'next/image';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function Navbar() {
  const { logout, isAuthenticated } = useAuth(); // Use the useAuth hook

  return (
    <nav className="px-8 py-4 m-4 flex justify-between items-center  sticky top-0 z-50">
      <div>
        <Image src={'/logo.png'} alt="Logo" width={48} height={48} />
      </div>
      <div className="text-black">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Me
          </MenuButton>
          <MenuList>
            <ul className="grid w-[100px] gap-2 p-2 md:w-[300px] md:grid-cols-1 lg:w-[300px]">
              <MenuItem>
                <Link href="/search">Search</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/settings">Settings</Link>
              </MenuItem>
              {isAuthenticated() && (
                <MenuItem onClick={logout}>
                  Logout
                </MenuItem>
              )}
            </ul>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
