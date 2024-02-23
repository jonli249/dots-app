import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchComponent from './search';
import DropdownMenu from './UserDropdown';

function Navbar() {
  const { pathname } = useRouter();
  const showSearchButton = pathname !== '/' && pathname !== '/settings';

  return (
    <nav className="px-4 py-2 flex justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <div style={{ width: '36px', height: '36px' }}>
          <Image src="/logo.png" alt="Logo" width={36} height={36} />
        </div>
      </Link>
      {showSearchButton && <SearchComponent />}
      <DropdownMenu />
    </nav>
  );
}

export default Navbar;
