import Image from "next/image";
import React from "react";
import ScrollforMore from "./ScrollforMore";
import { songsTogetherCardData } from "../icons/Helper";

const SongsTogetherCard = () => {
  return (
    <div className="max-w-[266px] w-full mx-auto">
      <div className="flex gap-3 items-center justify-center sm:justify-start">
        <Image src="/songs-cd.png" width={37} height={31} alt="cd-img" />
        <div>
          <p className="text-black text-[20px] sm:text-[29px] font-normal font-telegraf leading-normal">
            Songs Together
          </p>
        </div>
      </div>
      <div className="mt-[43px] flex flex-col gap-[14px]">
        {songsTogetherCardData.map((items, index) => (
          <div
            key={index}
            className="w-[266px] cursor-pointer h-[87px] xl:h-[97px] max-sm:mx-auto rounded-lg border border-[#696969] bg-white shadow-[2.089px_4.178px_10.446px_0px_rgba(0,0,0,0.10)] py-[18px] pl-4 2xl:pl-6 flex items-center gap-4"
          >
            <Image src={items.img} width={60} height={69} alt="as-it-img" />
            <div className="flex flex-col gap-1 items-start">
              <p
                className="text-black font-telegraf font-extrabold leading-normal"
                style={{ fontSize: `${items.font}` }}
              >
                {items.text}
              </p>
              <p className="text-black text-[15px] font-telegraf font-normal leading-normal">
                {items.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[22px] flex justify-center">
        <ScrollforMore />
      </div>
    </div>
  );
};

export default SongsTogetherCard;
