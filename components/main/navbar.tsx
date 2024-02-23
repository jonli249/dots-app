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
   <div className="px-5 z-[100]">

        <nav className="w-full mx-auto flex items-center justify-between pt-3 sm:pt-8">
          <Link href="/">
            <div style={{ width: '36px', height: '36px' }}>
              <Image src="/logo.png" alt="Logo" width={36} height={36} />
            </div>
          </Link>
          {showSearchButton && <SearchComponent />}
          <DropdownMenu />
        </nav>
  </div>
  );
}

export default Navbar;
