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
        <p className="text-black text-center text-base sm:text-[40px] md:text-[60px] lg:text-[80px] font-extrabold leading-normal font-telegraf -translate-y-[17px] sm:-translate-y-[39px] md:-translate-y-[69px]">
          Visualize collaborations in music
        </p>
      </div>
      <div className="mt-10 sm:mt-[75px] flex items-center mx-auto justify-center bg-center bg-cover sm:bg-contain bg-[url('/jack-card-bg.png')] max-w-[300px] sm:max-w-[895px] w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[895px] p-3 bg-no-repeat">
        <div className="max-w-[501px] w-full h-[168px] flex items-center justify-center bg-[url('/blur-bg.png')] bg-center bg-cover rounded-[100px]">
          <div className="sm:max-w-[436px] w-[240px] h-[70px] sm:h-[111px] sm:w-full border bg-white shadow-[2.445px_4.89px_12.225px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-[26px] items-center px-3 sm:pl-[27px] py-[18px] relative">
            <Image
              src="/jack-img.png"
              width={75}
              height={75}
              alt="jack's-image"
              className="w-[40px] h-[40px] sm:w-[75px] sm:h-[75px]"
            />
            <p className="text-black text-center font-telegraf text-base line-clamp-1 sm:text-[37px] font-extrabold leading-normal">
              Jack Antonoff
            </p>
            <Image
              src="/verified.png"
              width={52}
              height={54}
              alt="verification-sign"
              className="absolute -right-2 sm:-right-2 -top-2 sm:-top-5  rounded-full w-[40px] sm:w-[52px] h-[30px] sm:h-[54px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-20 sm:mt-[108px] max-w-[1211px] w-full mx-auto px-[17px]">
        <p className="text-center text-black text-[30px] md:text-[50px] lg:text-[70px] font-normal leading-[100%] font-telegraf">
          with the <span className="font-extralight">simplest</span>, yet most
          <span className="font-extrabold"> powerful</span> music credit search
          engine.
        </p>
      </div>
    </div>
  );
};

export default Collabrators;
