import React from "react";
import { ScrollForMoreArrowIcon } from "../icons/Icons";

const ScrollforMore = () => {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <div>
        <ScrollForMoreArrowIcon />
      </div>
      <div>
        <p className="text-black text-[15px] font-telegraf font-normal leading-normal">
          Scroll for more
        </p>
      </div>
      <div>
        <ScrollForMoreArrowIcon />
      </div>
    </div>
  );
};

export default ScrollforMore;
