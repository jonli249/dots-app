import Image from "next/image";
import React from "react";
import DegreesSwiper from "./DegreesSwiper";
import { Searchicon } from "../../icons/Icons";

const DegreesPage = () => {
  return (
    <div className="mx-auto max-w-[826px] w-full mt-[51px]">
      <div className="flex items-center max-md:gap-[26px] justify-center gap-[84px]">
        <div className="max-w-[192px] max-md:h-[35px] max-md:max-w-[135px] w-full h-[49px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] font-extrabold flex gap-[17px] items-center px-3 py-[15px]">
          <Image
            src="/tylor-swift.png"
            width={33}
            height={33}
            alt="harry-image"
            className="w-[33px] h-[33px] max-md:!h-[23px] max-md:!w-[23px]"
          />
          <p className="text-black text-center font-telegraf text-[16px] max-md:text-[12px] font-extrabold leading-normal line-clamp-1">
            Tylor Swift
          </p>
        </div>
        <div className="border-[1px] max-md:max-w-[135px] max-md:h-[35px] border-[#998] max-w-[192px] max-md:text-[12px] w-full h-[49px] rounded-[33px] shadow-[1.078px_2.156px_5.391px_0px_rgba(0,0,0,0.10);] placeholder:text-[#A4A4A4] text-[16px] font-extrabold leading-normal flex items-center justify-center px-[22px] max-md:px-3 gap-2">
          <Searchicon />
          <input
            type="text"
            placeholder="Search"
            className="flex justify-center max-w-[150px] w-full outline-none placeholder:text-center"
          />
        </div>
      </div>
      <div className="mt-[43px] max-md:hidden">
        <div className="w-[100px] h-[1px] flex justify-evenly items-center bg-[#000] opacity-[0.2] mx-auto">
          <div className="w-[5px] h-[5px] rounded-full bg-[#000] opacity-[0.2]"></div>
          <div className="w-[5px] h-[5px] rounded-full bg-[#000] opacity-[0.2]"></div>
          <div className="w-[5px] h-[5px] rounded-full bg-[#000] opacity-[0.2]"></div>
        </div>
        <div className="w-[173px] h-[1px]  flex justify-evenly items-center bg-[#000] opacity-[0.4] mx-auto mt-[36px]">
          <div className="w-[7px] h-[7px] rounded-full bg-[#000] opacity-[0.4]"></div>
          <div className="w-[7px] h-[7px] rounded-full bg-[#000] opacity-[0.4]"></div>
          <div className="w-[7px] h-[7px] rounded-full bg-[#000] opacity-[0.4]"></div>
        </div>
      </div>
      <div>
        <DegreesSwiper />
      </div>
      <div className="mt-[26px] max-md:hidden">
        <div className="w-[173px] h-[1px]  flex justify-evenly items-center bg-[#000] opacity-[0.4] mx-auto">
          <div className="w-[7px] h-[7px] rounded-full bg-[#000] opacity-[0.4]"></div>
          <div className="w-[7px] h-[7px] rounded-full bg-[#000] opacity-[0.4]"></div>
          <div className="w-[7px] h-[7px] rounded-full bg-[#000] opacity-[0.4]"></div>
        </div>
        <div className="w-[100px] h-[1px] flex justify-evenly items-center bg-[#000] opacity-[0.2] mx-auto mt-[36px]">
          <div className="w-[5px] h-[5px] rounded-full bg-[#000] opacity-[0.2]"></div>
          <div className="w-[5px] h-[5px] rounded-full bg-[#000] opacity-[0.2]"></div>
          <div className="w-[5px] h-[5px] rounded-full bg-[#000] opacity-[0.2]"></div>
        </div>
      </div>
    </div>
  );
};

export default DegreesPage;
