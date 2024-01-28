import React from 'react';
import Link from 'next/link';
import useAuth from '../../utils/useAuth'; // Import the useAuth hook
import Image from 'next/image';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
  } from "@/components/ui/navigation-menu" 

function Navbar() {
  const { logout, isAuthenticated } = useAuth(); // Use the useAuth hook

  return (
    <nav className="p-4 m-4 flex justify-between items-center bg-white bg-opacity-90 shadow-md sticky top-0 z-50">
      <div>
      <Image 
        src= {'/logo.png'}
        alt="Logo" 
        width = {48}
        height = {48} 
        />
      </div>
      <div className="text-black">
        <NavigationMenu>
            <NavigationMenuList>
            <NavigationMenuItem>
                <Link href="/songsearch" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Song Search
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/search" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Artist Search
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/settings" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Settings
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                    <div>
                {isAuthenticated() && ( 
                <button
                    onClick={logout}
                >
                    Logout
                </button>
                )}
            </div>
            </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      
    </nav>
  );
}
        
      

export default Navbar;