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

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  title: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

function Navbar() {
  const { logout, isAuthenticated } = useAuth(); // Use the useAuth hook

  return (
    <nav className="p-4 m-4 flex justify-between items-center bg-white bg-opacity-90 shadow-md sticky top-0 z-50">
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
              <ListItem title="Search">
                <Link href="/search">Search</Link>
              </ListItem>
              <ListItem title="Settings">
                <Link href="/settings">Settings</Link>
              </ListItem>
              {isAuthenticated() && (
                <ListItem title="Logout" onClick={logout}>
                  Logout
                </ListItem>
              )}
            </ul>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
