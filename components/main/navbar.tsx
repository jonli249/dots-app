import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Flex, Text, CloseButton, Spacer } from '@chakra-ui/react';

function Navbar() {
  const { pathname } = useRouter();
  const showSearchButton = pathname !== "/" && pathname !== "/settings";
  const [isBannerVisible, setBannerVisible] = useState(true);

  const imageContainerClass = showSearchButton
    ? "imageContainerWithSearch"
    : "imageContainerWithoutSearch";

  return (
    <div className="px-5 z-[100]">
      <nav className="w-full mx-auto flex items-center justify-between pt-8 sm:pt-6">
        <Link href="/">
          <div
            className={imageContainerClass}
            style={{ width: "36px", height: "36px" }}
          >
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
          </div>
        </Link>
    
     
          
      </nav>
    </div>
  );
}

export default Navbar;
