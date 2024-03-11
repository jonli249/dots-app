import React from "react";
import DegreeOfSapereation from "./DegreeOfSapereation";

const SmartTools = () => {
  return (
    <>
      <p className="px-3 text-center text-black text-lg sm:text-4xl md:text-[50px] 2xl:text-[60px] font-normal font-telegraf">
        Use
        <span className="font-extrabold px-1"> Smart Tools</span> to connect the
        dots
      </p>
      <DegreeOfSapereation />
    </>
  );
};

export default SmartTools;
