import React from "react";
import { playList } from "../icons/Helper";

const PlayListsTab = () => {
  return (
    <>
      <div className=" flex max-md:flex-wrap gap-10 justify-center sm:justify-between max-lg:gap-5">
        {playList.map((item, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${item.img})` }}
            className="max-w-[289px] w-full h-[148px]  bg-no-repeat bg-cover bg-center  p-[22px]"
          >
            <p className="text-white font-inter font-bold text-[24px] leading-normal">
              {item.heading}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayListsTab;
