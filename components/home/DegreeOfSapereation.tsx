import React from "react";
import Getstarted from "./Getstarted";
import DegreeofSaperationHeader from "./DegreeofSaperationHeader";
import SongsTogetherCard from "./SongsTogetherCard";
import MutualCollaborators from "./MutualCollaborators";

const DegreeOfSapereation = () => {
  return (
    <div className="mt-20 md:mt-[105px] 2xl:mt-[126px]">
      <div>
        <DegreeofSaperationHeader />
      </div>
      <div className="max-w-[800px] w-full px-4 flex flex-col sm:flex-row items-start mt-5 md:mt-[30px] 2xl:mt-[46px] gap-3 justify-between mx-auto">
        <SongsTogetherCard />
        <MutualCollaborators />
      </div>
      <Getstarted />
    </div>
  );
};

export default DegreeOfSapereation;
