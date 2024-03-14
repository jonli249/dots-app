import React from "react";
import Image from "next/image";
import { Searchicon } from "../icons/Icons";

const Quicklysec = () => {
  return (
    <div className="w-full flex flex-col items-center mt-20 md:mt-[95px] 2xl:mt-[108px]">
      <h2 className="text-black px-3 md:px-0 text-lg sm:text-[42px] md:text-[50px] 2xl:text-[60px] text-center leading-normal font-normal">
        Quickly browse through thousands of <br /> Songs, Artists, Songwriters
        and Producers.
      </h2>

      {/* search input with background */}
      <div className="max-w-[800px] 2xl:max-w-[1014px] w-full mx-auto my-4 sm:my-6 md:my-10 2xl:my-[70px] px-4 md:px-12 2xl:px-12 h-[120px] sm:h-[210px] bg-[url(/input-bg.png)] bg-center bg-contain 2xl:bg-cover flex items-center justify-center bg-no-repeat">
        <div
          className="w-full rounded-[12px] border-[1.2px] border-[#B3B3B3] bg-white shadow-[2.402px_4.804px_12.011px_0px_rgba(0,0,0,0.05)] py-2 xl:py-4 2xl:py-5 
        px-4 xl:px-5 2xl:px-7 flex items-center gap-2 sm:gap-3"
        >
          <Searchicon />
          <input
            type="text"
            className="w-full bg-transparent outline-none font-inter text-base sm:text-[21px] font-normal"
            placeholder="Search for artists, songs, writers, producers"
          />
          <Image
            src="/input-cube-k.png"
            height={38}
            width={80}
            className="cursor-pointer max-sm:h-7"
            alt="cube+k"
          />
        </div>
      </div>
    </div>
  );
};

export default Quicklysec;
