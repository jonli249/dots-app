import React from "react";
import Image from "next/image";
import { SearchIcon } from "@chakra-ui/icons";

const ConnectDotsHeader = () => {
  return (
    <div>
      <div className="flex justify-center sm:justify-between gap-3 sm:gap-8 flex-col sm:flex-row mx-auto sm:max-w-[447px] sm:w-full w-fit">
        <div className="max-w-[192px] w-full h-[49px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] font-extrabold flex gap-[17px] items-center px-3 py-[15px]">
          <Image
            src="/img/tyler.png"
            width={64}
            height={64}
            alt="harry-image"
            className="w-[33px] h-[33px]"
          />
          <p className="text-black text-center font-telegraf text-base font-extrabold leading-normal">
            Taylor Swift
          </p>
        </div>
        <div className="border-[1px] border-[#998] max-w-[192px] w-full h-[49px] rounded-[33px] shadow-[1.078px_2.156px_5.391px_0px_rgba(0,0,0,0.10);] placeholder:text-[#A4A4A4] text-base font-extrabold leading-normal flex items-center justify-center px-3 sm:pl-[22px] gap-2">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none placeholder:text-center font-telegraf text-base font-extrabold leading-normal text-[#A4A4A4] placeholder:font-telegraf placeholder:text-base placeholder:font-extrabold placeholder:leading-normal placeholder:text-[#A4A4A4]"
          />
        </div>
      </div>
      <div className="border border-black border-t-0 max-w-[297px] h-[39px] mx-auto mt-3 hidden sm:block"></div>
      <div className="bg-black w-px h-[39px] mx-auto hidden sm:block"></div>
    </div>
  );
};

export default ConnectDotsHeader;
