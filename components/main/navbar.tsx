import React from 'react';
import Link from 'next/link';
import useAuth from '../../utils/useAuth'; // Import the useAuth hook
import Image from 'next/image';
import { useRouter } from 'next/router';
import  SearchComponent  from './search';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function Navbar() {
  const { logout, isAuthenticated } = useAuth(); 
  const { pathname } = useRouter();
  const showSearchButton = pathname !== '/' && pathname !== '/settings';


  return (
    <nav className="px-8 py-4 m-4 flex justify-between items-center space-x-80 sticky top-0 z-50">
      <div>
        <Image src={'/logo.png'} alt="Logo" width={48} height={48} />
      </div>
      {showSearchButton && (
        <SearchComponent />
      )}
      <div className="text-black">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Me
          </MenuButton>
          <MenuList>
            <ul className="grid w-[100px] gap-2 p-2 md:w-[300px] md:grid-cols-1 lg:w-[300px]">
              <Link href="/settings">
              <MenuItem>
                Settings
              </MenuItem>
              </Link>
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
