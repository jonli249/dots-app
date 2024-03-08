import Image from "next/image";
import React from "react";
import ScrollforMore from "./ScrollforMore";
import { mutualCollaboratorsCardData } from "../icons/Helper";

const MutualCollaborators = () => {
  return (
    <div className="max-w-[353px] w-full max-sm:mx-auto max-sm:mt-10">
      <div className="flex justify-center gap-5 items-center">
        <Image
          src="/mutual-collaborators.png"
          width={43}
          height={32}
          alt="cd-img"
        />
        <p className="text-black text-[20px] sm:text-[29px] font-normal font-telegraf leading-normal">
          Mutual Collaborators
        </p>
      </div>
      <div className="mt-[43px] flex flex-col gap-[18px] items-center">
        {mutualCollaboratorsCardData.map((items, index) => (
          <div
            key={index}
            className="w-[243px] cursor-pointer h-[62px] border bg-white shadow-[1.364px_2.727px_6.818px_0px_rgba(0,0,0,0.10)] border-black rounded-[75px] flex gap-[10px] items-center pl-3 py-[10px]"
          >
            <Image src={items.img} width={42} height={42} alt="harry-image" />
            <p className="text-black text-center font-telegraf text-[18px] sm:text-[21px] font-extrabold leading-normal">
              {items.name}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-[22px] flex justify-center">
        <ScrollforMore />
      </div>
    </div>
  );
};

export default MutualCollaborators;
