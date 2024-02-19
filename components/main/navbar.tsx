import React, { useState } from 'react';
import Link from 'next/link';
import useAuth from '../../utils/useAuth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchComponent from './search';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const { pathname } = useRouter();
  const showSearchButton = pathname !== '/' && pathname !== '/settings';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="px-4 py-2 flex justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <div style={{ width: '36px', height: '36px' }}>
          <Image src="/logo.png" alt="Logo" width={36} height={36} />
        </div>
      </Link>
      {showSearchButton && <SearchComponent />}
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
    </nav>
  );
}

export default Navbar;
