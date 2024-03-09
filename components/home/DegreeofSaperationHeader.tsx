import Image from "next/image";
import React from "react";

const DegreeofSaperationHeader = () => {
  return (
    <div>
      <div className="w-fit mx-auto flex gap-3 items-center">
        <div className="text-black text-[18px] sm:text-[26px] font-telegraf font-normal leading-normal flex items-center justify-center gap-4">
          <div className="w-[38px] h-[38px] border-[2px] border-black rounded-full flex items-center justify-center">
            <span className=" text-[26px] font-extrabold font-inter text-black">
              1
            </span>
          </div>
          Degree of Separation
        </div>
      </div>

      <div className="max-w-[700px] 2xl:max-w-[914px] w-full mx-auto bg-[url('/blur-bg.png')] bg-center bg-cover h-[240px] 2xl:h-[340px] rounded-[52px] flex flex-col sm:flex-row items-center justify-center max-sm:gap-4 px-7">
        {/* first name */}
        <div className="w-[260px] md:w-[280px] 2xl:w-[372px] h-[70px] 2xl:h-[95px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-[10px] items-center justify-start px-3 2xl:px-4 flex-shrink-0">
          <Image
            src="/harry-img.png"
            width={64}
            height={64}
            alt="harry-image"
            className="w-10 h-10 md:w-[50px] md:h-[50px] 2xl:w-[64px] 2xl:h-[64px]"
          />
          <p className="text-black text-left font-telegraf text-[20px] md:text-2xl 2xl:text-[32px] font-extrabold leading-normal line-clamp-1">
            Harry Styles
          </p>
        </div>

        {/* hr line */}
        <div className="w-full hidden sm:block h-[3px] bg-black"></div>

        {/* second name */}
        <div className="w-[260px] md:w-[280px] 2xl:w-[372px] h-[70px] 2xl:h-[95px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-[10px] items-center justify-start px-3 2xl:px-4 flex-shrink-0">
          <Image
            src="/tylor-img.png"
            width={64}
            height={64}
            alt="tylor-image"
            className="w-10 h-10 md:w-[50px] md:h-[50px] 2xl:w-[64px] 2xl:h-[64px]"
          />
          <p className="text-black text-left font-telegraf text-[20px] md:text-2xl 2xl:text-[32px] font-extrabold leading-normal line-clamp-1">
            Tyler Johnson
          </p>
        </div>
      </div>

      {/* vertical bar */}
      <div className="bg-black w-[3px] h-[160px] 2xl:h-[170px] hidden sm:block mx-auto -mt-[120px] 2xl:-mt-[170px]"></div>
      {/* horizontal bar */}
      <div className="max-w-[484px] w-full hidden sm:block h-[60px] border-[3px] border-black border-b-0 mx-auto"></div>
    </div>
  );
};

export default DegreeofSaperationHeader;
