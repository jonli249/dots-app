import Image from "next/image";
import React from "react";

const DegreeofSaperationHeader = () => {
  return (
    <div>
      <div className="w-fit mx-auto flex gap-3 items-center">
        <div className="text-black text-[18px] sm:text-[26px] font-telegraf font-normal leading-normal flex items-center justify-center gap-2 sm:gap-4">
          <div className="w-6 sm:w-[38px] h-6 sm:h-[38px] border-[2px] border-black rounded-full flex items-center justify-center">
            <span className="text-lg sm:text-[26px] font-semibold sm:font-extrabold font-inter text-black">
              1
            </span>
          </div>
          Degree of Separation
        </div>
      </div>

      <div className="max-w-[700px] 2xl:max-w-[900px] w-full mx-auto sm:-mt-7 bg-[url('/blur-bg.png')] bg-center bg-cover bg-no-repeat h-[200px] sm:h-[220px] 2xl:h-[290px] rounded-[52px] flex flex-col sm:flex-row items-center justify-center max-sm:gap-4 px-7">
        {/* first name */}
        <div
          className="w-[240px] sm:w-[260px] md:w-[280px] 2xl:w-[342px] h-[55px] sm:h-[70px] 2xl:h-[77px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-4 items-center justify-start 
        px-2 sm:px-3 flex-shrink-0"
        >
          <Image
            src="/harry-img.png"
            width={64}
            height={64}
            alt="harry-image"
            className="w-10 h-10 md:w-[50px] md:h-[50px] 2xl:w-[60px] 2xl:h-[60px]"
          />
          <p className="text-black text-left font-telegraf text-[20px] md:text-2xl 2xl:text-[28px] font-extrabold leading-normal line-clamp-1">
            Harry Styles
          </p>
        </div>

        {/* hr line */}
        <div className="w-full hidden sm:block h-[3px] bg-black"></div>

        {/* second name */}
        <div className="w-[240px] sm:w-[260px] md:w-[280px] 2xl:w-[342px] h-[55px] sm:h-[70px] 2xl:h-[77px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-4 items-center justify-start px-2 sm:px-3 flex-shrink-0">
          <Image
            src="/tylor-img.png"
            width={64}
            height={64}
            alt="tylor-image"
            className="w-10 h-10 md:w-[50px] md:h-[50px] 2xl:w-[60px] 2xl:h-[60px]"
          />
          <p className="text-black text-left font-telegraf text-[20px] md:text-2xl 2xl:text-[28px] font-extrabold leading-normal line-clamp-1">
            Tyler Johnson
          </p>
        </div>
      </div>

      {/* vertical bar */}
      <div className="bg-black w-[3px] h-[110px] 2xl:h-[115px] hidden sm:block mx-auto -mt-[110px] 2xl:-mt-[145px]"></div>

      {/* horizontal bar */}
      <div className="max-w-[430px] w-full hidden sm:block h-[60px] border-[3px] border-black border-b-0 mx-auto"></div>
    </div>
  );
};

export default DegreeofSaperationHeader;
