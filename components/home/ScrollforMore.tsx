import React from "react";
import { ScrollForMoreArrowIcon } from "../icons/Icons";

const ScrollforMore = () => {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <ScrollForMoreArrowIcon />
      <p className="text-black text-[15px] font-telegraf font-normal leading-normal">
        Scroll for more
      </p>
      <ScrollForMoreArrowIcon />
    </div>
  );
};

export default ScrollforMore;
