import Image from "next/image";
import React from "react";
import { btnmap } from "../icons/Helper";

const Hero = () => {
  return (
    <div className="w-full bg-[url(/hero-bg.png)] bg-cover bg-center bg-no-repeat h-[95vh] sm:h-screen flex justify-center items-center">
      <div className="flex flex-col items-center max-w-[900px] w-full">
        {" "}
        <div className="flex gap-6 items-center sm:flex-row flex-col">
          <>
            <Image src="/dit-img.png" height={57} width={64} alt="icon" />
          </>
          <h1 className="text-black text-[26px] sm:text-[32px] md:text-[42px] lg:text-[60px] font-telegraf font-extrabold text-center">
            Smart Music Credits for
          </h1>
        </div>
        <div className="w-full max-w-[685px] relative h-fit">
          <div className="md:max-w-[150px] sm:max-w-[100px] max-w-[50px] w-full absolute left-0 top-9 bg-[#ffffff61] z-10 h-[60px] sm:h-[100px]"></div>
          <div className="mt-9 sm:mt-14 flex gap-3 w-full overflow-scroll example">
            {btnmap.map((item, index) => (
              <button
                key={index}
                type="submit"
                className=" px-4 slideanihero py-1 sm:py-3 rounded-[10px] w-[185px] sm:w-[255px] h-[52px] sm:h-[74px] border border-[#CDCDCD] bg-[rgba(255,255,255,0.30);] shadow-[2px_ 4px_10px_0px_rgba(0,0,0,0.10);] text-black text-[20px] sm:text-[35px] font-semibold font-inter"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="md:max-w-[150px] sm:max-w-[100px] max-w-[50px] w-full absolute right-0 top-9 bg-[#ffffff62] z-10 h-[60px] sm:h-[100px]"></div>
        </div>
        <div className="w-[230px] h-[106px] mt-8 sm:mt-[51px] bg-[url(/btn-bg.png)] bg-center bg-cover bg-no-repeat flex items-center justify-center">
          <button
            type="submit"
            className="h-[58px] sm:h-[71px] max-w-[209px] w-full rounded-[7px] text-white font-inter text-base sm:text-[19px] font-bold hover:bg-transparent hover:text-black bg-black shadow-[2.495px_4.99px_24.951px_0px_rgba(0,0,0,0.25)]"
          >
            JOIN WAITLIST
          </button>
        </div>
        <button
          type="submit"
          className="text-black font-inter max-w-[209px] w-full rounded-[7px] h-[58px] sm:h-[71px] text-base sm:text-[25px] hover:bg-black hover:text-white font-medium mt-2 px-4 py-2"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Hero;
