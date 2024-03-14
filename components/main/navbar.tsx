import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchComponent from "./search";
import DropdownMenu from "./UserDropdown";

function Navbar() {
  const { pathname } = useRouter();
  const showSearchButton = pathname !== "/" && pathname !== "/settings";

  const imageContainerClass = showSearchButton
    ? "imageContainerWithSearch"
    : "imageContainerWithoutSearch";

  return (
    <div className="px-5 z-[100]">
      <nav className="w-full mx-auto flex items-center justify-between pt-2 sm:pt-3">
        <Link href="/">
          {/* Apply the conditional class or style here */}
          <div
            className={imageContainerClass}
            style={{ width: "36px", height: "36px" }}
          >
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
          </div>
        </Link>
        {showSearchButton && <SearchComponent />}
        <div className="drop-menu">
          <DropdownMenu />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
