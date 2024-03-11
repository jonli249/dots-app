import React from "react";

const Getstarted = () => {
  return (
    <div className="mt-12 md:mt-24 2xl:mt-[120px] mb-4 sm:mb-16 2xl:mb-[90px]">
      <p className="text-black font-telegraf text-center text-[30px] md:text-[50px] 2xl:text-[65px] font-normal">
        Get Started Now!
      </p>
      <div className="bg-[url(/blur-bg.png)] max-w-[260px] w-full h-[115px] sm:h-[150px] mt-5 md:mt-7 2xl:mt-[35px] px-3 mx-auto bg-center bg-cover bg-no-repeat flex items-center justify-center">
        <button
          type="submit"
          className="max-w-[145px] sm:max-w-[200px] w-full h-[40px] sm:h-[65px] rounded-[7px] text-white font-inter text-sm sm:text-lg font-bold hover:bg-transparent hover:text-black bg-black shadow-[2.495px_4.99px_24.951px_0px_rgba(0,0,0,0.25)] transition-all duration-200 ease-in-out"
        >
          JOIN WAITLIST
        </button>
      </div>
    </div>
  );
};

export default Getstarted;
