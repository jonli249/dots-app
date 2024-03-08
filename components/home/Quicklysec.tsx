import React from "react";
import Image from "next/image";
import { Searchicon } from "../icons/Icons";

const Quicklysec = () => {
  return (
    <div className="w-full flex flex-col   items-center mt-20 sm:mt-[108px]">
      <h2 className="text-black text-[18px] px-3 md:px-0 sm:text-[42px]  md:text-[70px] text-center leading-normal font-normal">
        Quickly browse through thousands of <br className="max-xl:hidden" />{" "}
        Songs, Artists, Songwriters and Producers.
      </h2>

      {/* search input with background */}
      <div className="max-w-[840px] lg:max-w-[1014px] w-full mx-auto sm:my-6 md:my-[100px] px-2 sm:px-12 h-[140px] sm:h-[200px] bg-[url(/input-bg.png)] bg-center bg-cover flex items-center justify-center">
        <div className="w-full rounded-[12px] border-[1.2px] border-[#B3B3B3] bg-white shadow-[2.402px_4.804px_12.011px_0px_rgba(0,0,0,0.05);] py-2 sm:py-5 px-4 sm:px-7 flex items-center gap-2 sm:gap-6">
          <Searchicon />
          <input type="text" className="w-full  bg-transparent outline-none" />
          <Image
            src="/input-cube-k.png"
            height={38}
            width={80}
            className=" cursor-pointer"
            alt="cube+k"
          />
        </div>
      </div>
    </div>
  );
};

export default Quicklysec;
