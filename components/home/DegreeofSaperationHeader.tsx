import Image from "next/image";
import React from "react";

const DegreeofSaperationHeader = () => {
  return (
    <>
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

      <div className="max-w-[914px] w-full mx-auto bg-[url('/blur-bg.png')] bg-center bg-cover h-[300px] rounded-[52px] flex flex-col sm:flex-row items-center justify-center max-sm:gap-4 px-7">
        <div className="md:max-w-[371px] w-[240px] h-[70px] md:h-[111px] md:w-full border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-[10px] items-center px-4 py-[15px]">
          <Image
            src="/harry-img.png"
            width={64}
            height={64}
            alt="harry-image"
            className="w-[40px] h-[40px] md:w-[64px] md:h-[64px]"
          />
          <p className="text-black text-center font-telegraf text-[20px] md:text-[32px] font-extrabold leading-normal">
            Harry Styles
          </p>
        </div>
        <div className="md:w-[244px] hidden sm:block w-[150px] h-[1px] bg-black"></div>
        <div className="md:max-w-[371px] w-[240px] h-[70px] md:h-[111px] md:w-full border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-[10px] items-center px-4 py-[15px]">
          <Image
            src="/tylor-img.png"
            width={64}
            height={64}
            alt="tylor-image"
            className="w-[40px] h-[40px] md:w-[64px] md:h-[64px]"
          />
          <p className="text-black text-center font-telegraf text-[20px] md:text-[32px] font-extrabold leading-normal">
            Tyler Johnson
          </p>
        </div>
      </div>

      {/* vertical bar */}
      <div className="bg-black w-[1px] h-[151px] hidden sm:block mx-auto -mt-[150px]"></div>
      {/* horizontal bar */}
      <div className="max-w-[484px] w-full hidden sm:block h-[60px] border border-black border-b-0 mx-auto"></div>
    </>
  );
};

export default DegreeofSaperationHeader;
