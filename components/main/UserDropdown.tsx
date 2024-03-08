import React, { useState, Fragment } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import useAuth from "../../utils/useAuth";
import Image from "next/image";
//import { AccountIcon, SettingsIcon, LogoutIcon } from "../icon/Icons";

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
      <MenuList className="flex flex-col gap-5 ">
        <MenuItem onClick={() => setMenuOpen(false)}>
          <Link href="/account" className="flex items-center gap-3">
            {" "}
            <span>
              <Image
                src="/account-icon.png"
                width={25}
                height={25}
                alt="Account Icon"
              />
            </span>{" "}
            Account
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setMenuOpen(false)}>
          <Link href="/settings" className="flex items-center gap-3">
            <span>
              <Image
                src="/setting-icon.png"
                width={25}
                height={25}
                alt="Settings icon"
              />
            </span>
            Settings
          </Link>
        </MenuItem>
        {isAuthenticated() && (
          <MenuItem
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
          >
            Logout
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default DropdownMenu;
