import React from "react";
import DegreeOfSapereation from "./DegreeOfSapereation";

const SmartTools = () => {
  return (
    <div className="px-3 pb-10 md:pb-[123px]">
      <p className="text-center text-black text-[30px] md:text-[50px] lg:text-[70px] font-normal leading-normal font-telegraf">
        Use
        <span className="font-extrabold px-1"> Smart Tools</span> to connect the
        dots
      </p>
      <DegreeOfSapereation />
    </div>
  );
};

export default SmartTools;
