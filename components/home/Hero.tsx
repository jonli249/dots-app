import Image from "next/image";
import React from "react";
import Heroswiper from "./Heroswiper";

const Hero = () => {
  return (
    <div className="w-full max-lg:px-3 bg-[url(/hero-bg.png)] bg-cover bg-center bg-no-repeat h-[65vh] sm:h-[70vh] xl:h-[85vh] 2xl:h-screen flex justify-center items-center">
      <div className="flex flex-col items-center max-w-[900px] w-full">
        <div className="flex gap-6 items-center sm:flex-row flex-col">
          <Image
            src="/dit-img.png"
            className="max-md:w-[54px] max-md:h-[47px]"
            width={64}
            height={57}
            alt="icon"
          />
          <h1 className="text-black text-xl sm:text-[32px] md:text-[42px] lg:text-[60px] font-telegraf font-extrabold text-center">
            Smart Music Credits for
          </h1>
        </div>

        {/* swiper section */}
        <div className="w-full max-lg:px-3 max-w-[300px] sm:max-w-[540px] lg:max-w-[523px] 2xl:max-w-[683px] relative h-fit">
          {/* white box */}
          <div className="max-w-[50px] md:max-w-[250px] sm:max-w-[100px] w-full absolute left-0 top-9 bg-[linear-gradient(90deg,#fff_8.21%,rgba(0,0,0,0)_82.61%)] z-10 h-[60px] sm:h-[100px]"></div>

          <div className="w-full mt-6 md:mt-10 2xl:mt-[51px]">
            <Heroswiper />
          </div>

          {/* white box */}
          <div className="max-w-[50px] md:max-w-[250px] sm:max-w-[100px] w-full absolute right-0 top-9 bg-[linear-gradient(270deg,#fff_8.21%,rgba(0,0,0,0)_82.61%)] z-10 h-[60px] sm:h-[100px]"></div>
        </div>

        <div className="w-[220px] h-[90px] sm:h-[115px] mt-3 sm:mt-[51px] bg-[url(/btn-bg.png)] bg-center bg-contain sm:bg-cover bg-no-repeat flex items-center justify-center">
          <button
            type="submit"
            className="max-w-[145px] sm:max-w-[200px] w-full h-10 sm:h-[65px] rounded-[7px] text-white font-inter text-sm sm:text-lg font-bold hover:bg-transparent hover:text-black bg-black shadow-[2.495px_4.99px_24.951px_0px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out"
          >
            JOIN WAITLIST
          </button>
        </div>
        <button
          type="submit"
          className="text-black font-inter max-w-[145px] sm:max-w-[200px] w-full rounded-[7px] h-10 sm:h-[65px] text-sm sm:text-[22px] hover:bg-black hover:text-white font-medium -mt-1 sm:mt-2 px-4 py-2 transition-all duration-200 ease-in-out"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Hero;
