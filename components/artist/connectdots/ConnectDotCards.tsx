import Image from "next/image";
import React from "react";
import { connectDotsCardData } from "../../icons/Helper";

const ConnectDotCards = () => {
  return (
    <div className="flex mt-7 flex-wrap gap-x-[15px] gap-y-[22px] max-w-[615px] w-full mx-auto max-sm:px-3">
      {connectDotsCardData.map((items, index) => (
        <div
          key={index}
          className="w-[195px] cursor-pointer h-[70px] max-sm:mx-auto rounded-lg border border-[#696969] bg-white shadow-[2.089px_4.178px_10.446px_0px_rgba(0,0,0,0.10)] py-[14px] pl-3 flex items-center gap-2 hover:border-[#DDD3A0] hover:shadow-[#DDD3A0] hover:border-[3px] hover:shadow-xl duration-150"
        >
          <Image src={items.img} width={39} height={39} alt="as-it-img" />
          <div className="flex flex-col items-start">
            <p className="text-black font-telegraf font-extrabold leading-normal text-[13px]">
              {items.text}
            </p>
            <p className="text-black text-[9px] font-telegraf font-normal leading-normal">
              {items.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectDotCards;
