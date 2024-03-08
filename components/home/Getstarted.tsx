import React from "react";

const Getstarted = () => {
  return (
    <div className="mt-12 sm:mt-[153px]">
      <div>
        <p className="text-black font-telegraf text-center text-[30px] sm:text-[81px] font-normal">
          Get Started Now!
        </p>
      </div>
      <div className="bg-[url(/blur-bg.png)] max-w-[260px] w-full h-[150px] mt-6 sm:mt-[47px] px-3 mx-auto bg-center bg-cover bg-no-repeat flex items-center justify-center">
        <button
          type="submit"
          className="w-[209px] rounded-[7px] h-[58px] sm:h-[71px] text-white font-inter text-[19px] font-bold hover:bg-transparent hover:text-black duration-300 bg-black shadow-[2.495px_4.99px_24.951px_0px_rgba(0,0,0,0.25);]"
        >
          JOIN WAITLIST
        </button>
      </div>
    </div>
  );
};

export default Getstarted;
