import React from "react";

const FlowLine = () => {
  return (
    <>
      <div className="mx-auto max-w-[250px]">
        <div className="flex items-end justify-center">
          <div className="bg-black w-[1px] h-7 sm:h-[30px]"></div>
          <div className="bg-black w-[140px] sm:w-[279px] h-[1px]"></div>
          <div className="bg-black w-[1px] h-7 sm:h-[30px]"></div>
        </div>
        <div className="bg-black w-[1px] h-7 sm:h-[30px] mx-auto"></div>
      </div>
    </>
  );
};

export default FlowLine;