import Image from "next/image";
import React from "react";
import Heroswiper from "./Heroswiper";

const Hero = () => {
  return (
    <div className="w-full bg-[url(/hero-bg.png)] bg-cover bg-center bg-no-repeat h-[70vh] xl:h-[85vh] 2xl:h-screen flex justify-center items-center">
      <div className="flex flex-col items-center max-w-[900px] w-full">
        <div className="flex gap-6 items-center sm:flex-row flex-col">
          <Image
            src="/dit-img.png"
            className="max-md:w-[57px] max-md:h-[57px]"
            height={57}
            width={64}
            alt="icon"
          />
          <h1 className="text-black text-2xl sm:text-[32px] md:text-[42px] lg:text-[60px] font-telegraf font-extrabold text-center">
            Smart Music Credits for
          </h1>
        </div>
        <div className="w-full max-w-[350px] sm:max-w-[685px] relative h-fit">
          <div className="md:max-w-[250px] sm:max-w-[100px] max-w-[50px] w-full absolute left-0 top-9 bg-[linear-gradient(90deg,#fff_8.21%,rgba(0,0,0,0)_82.61%);] z-10 h-[60px] sm:h-[100px]"></div>
          <div className="w-full mt-[51px]">
            <Heroswiper />
          </div>
          <div className="md:max-w-[250px] sm:max-w-[100px] max-w-[50px] w-full absolute right-0 top-9 bg-[linear-gradient(270deg,#fff_8.21%,rgba(0,0,0,0)_82.61%);] z-10 h-[60px] sm:h-[100px]"></div>
        </div>
        <div className="w-[220px] h-[115px] mt-4 sm:mt-[51px] bg-[url(/btn-bg.png)] bg-center bg-cover bg-no-repeat flex items-center justify-center">
          <button
            type="submit"
            className="max-w-[180px] sm:max-w-[209px] w-full h-[45px] sm:h-[71px] rounded-[7px] text-white font-inter text-base sm:text-[19px] font-bold hover:bg-transparent hover:text-black bg-black shadow-[2.495px_4.99px_24.951px_0px_rgba(0,0,0,0.25)]"
          >
            JOIN WAITLIST
          </button>
        </div>
        <button
          type="submit"
          className="text-black font-inter max-w-[180px] sm:max-w-[209px] w-full rounded-[7px] h-[45px] sm:h-[71px] text-base sm:text-[25px] hover:bg-black hover:text-white font-medium mt-2 px-4 py-2"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Hero;
