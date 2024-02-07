import React from 'react';
import Link from 'next/link';
import useAuth from '../../utils/useAuth'; // Import the useAuth hook
import Image from 'next/image';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle, 
    NavigationMenuContent
  } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils"


  const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

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
                <Link href="/search" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Search
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
            <NavigationMenuTrigger>Me</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[100px] gap-2 p-2 md:w-[300px] md:grid-cols-1 lg:w-[300px]">
              
                  <ListItem href='/settings'>
                    Settings
                  </ListItem>
                  {isAuthenticated() && (
                    <ListItem onClick={logout}> 
                      Logout
                    </ListItem>
                  )}
            

            </ul>
          </NavigationMenuContent>
              
              </NavigationMenuItem>
            <NavigationMenuItem>
                    
            </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      
    </nav>
  );
}
        
      

export default Navbar;