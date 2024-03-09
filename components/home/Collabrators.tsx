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
          className="text-black text-center text-base sm:text-[30px] md:text-[40px] lg:text-[55px] 2xl:text-[80px] font-extrabold leading-normal font-telegraf 
        -mt-[14px] sm:-mt-[27px] md:-mt-[37px] lg:-mt-[50px] 2xl:-mt-[69px]"
        >
          Visualize collaborations in music
        </p>
      </div>
      <div className="mt-10 sm:mt-[75px] flex items-center mx-auto justify-center bg-center bg-cover sm:bg-contain bg-[url('/jack-card-bg.png')] max-w-[300px] sm:max-w-[895px] w-full h-[300px] sm:h-[400px] md:h-[480px] 2xl:h-[895px] p-3 bg-no-repeat">
        <div className="max-w-[350px] 2xl:max-w-[501px] w-full h-[140px] sm:h-[170px] 2xl:h-[210px] flex items-center justify-center bg-[url('/blur-bg.png')] bg-center bg-cover rounded-[10px] 2xl:rounded-[100px]">
          <div className="w-[240px] 2xl:max-w-[436px] 2xl:w-full h-[70px] 2xl:h-[111px] border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[35px] 2xl:rounded-[75px] flex gap-[26px] items-center px-3 2xl:pl-[27px] py-[18px] relative">
            <Image
              src="/jack-img.png"
              width={75}
              height={75}
              alt="jack's-image"
              className="w-[45px] h-[45px] 2xl:w-[75px] 2xl:h-[75px]"
            />
            <p className="text-black text-center font-telegraf line-clamp-1 text-lg 2xl:text-[37px] font-extrabold leading-normal">
              Jack Antonoff
            </p>
            <div className="absolute -right-0 2xl:-right-2 top-[-5px] 2xl:-top-5 bg-white rounded-full w-5 2xl:w-10 h-5 2xl:h-10"></div>
            <Image
              src="/verified.png"
              width={66}
              height={56}
              alt="verification-sign"
              className="absolute -right-2 2xl:-right-2 -top-4 2xl:-top-5 w-[50px] 2xl:w-[66px] h-10 2xl:h-[56px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-20 sm:mt-[108px] max-w-[1211px] w-full mx-auto px-3 text-center text-black text-[30px] md:text-[55px] 2xl:text-[70px] font-normal leading-[100%] font-telegraf">
        <p>
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
