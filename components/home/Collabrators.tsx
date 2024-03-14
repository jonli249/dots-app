import Image from "next/image";
import React from "react";

const Collabrators = () => {
  return (
    <div className="w-full">
      <Image
        src="/bg-image.png"
        width={1728}
        height={166}
        alt="bg"
        className="w-full"
      />
      <div className="px-3">
        <p
          className="text-black text-center text-sm sm:text-[30px] md:text-[40px] lg:text-[55px] 2xl:text-[62px] font-extrabold leading-normal font-telegraf 
        -mt-[12px] sm:-mt-[27px] md:-mt-[37px] lg:-mt-[50px] 2xl:-mt-[54px]"
        >
          Visualize collaborations in music
        </p>
      </div>
      <div className="mt-10 sm:mt-[70px] flex items-center mx-auto justify-center bg-center bg-contain bg-[url('/jack-card-bg.png')] max-w-[260px] sm:max-w-[895px] w-full h-[300px] sm:h-[400px] md:h-[480px] 2xl:h-[600px] p-3 bg-no-repeat">
        <div className="max-w-[350px] 2xl:max-w-[501px] w-full h-[140px] sm:h-[170px] 2xl:h-[210px] flex items-center justify-center bg-[url('/blur-bg.png')] bg-center bg-cover rounded-[10px] 2xl:rounded-[100px]">
          <div
            className="w-[195px] 2xl:max-w-[300px] 2xl:w-full h-[45px] 2xl:h-[85px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[35px] 2xl:rounded-[75px] flex gap-3 sm:gap-4 items-center 
          px-2 2xl:pl-4 py-3 sm:py-[18px] relative"
          >
            <Image
              src="/jack-img.png"
              width={75}
              height={75}
              alt="jack's-image"
              className="w-[30px] h-[30px] 2xl:w-[55px] 2xl:h-[55px]"
            />
            <p className="text-black font-telegraf line-clamp-1 text-base 2xl:text-[24px] font-extrabold leading-normal">
              Jack Antonoff
            </p>
            <div className="absolute -right-1 2xl:-right-2 top-[-12px] 2xl:-top-[22px] bg-white rounded-full w-5 2xl:w-[35px] h-5 2xl:h-[35px]"></div>
            <Image
              src="/verified.png"
              width={66}
              height={56}
              alt="verification-sign"
              className="absolute -right-1 2xl:-right-2 -top-3 2xl:-top-[18px] w-[30px] 2xl:w-[50px] h-[25px] 2xl:h-[40px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 sm:mt-[100px] max-w-[1211px] w-full mx-auto px-3 text-center text-black text-[30px] md:text-[55px] 2xl:text-[60px] font-normal leading-[100%] font-telegraf">
        <p className="max-sm:max-w-[278px] w-full mx-auto">
          with the <span className="font-extralight">simplest</span>, yet most
        </p>
        <p>
          <span className="font-extrabold"> powerful</span> music credit search
          engine.
        </p>
      </div>
    </div>
  );
};

export default Collabrators;
