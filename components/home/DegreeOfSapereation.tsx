import React from "react";
import Getstarted from "./Getstarted";
import DegreeofSaperationHeader from "./DegreeofSaperationHeader";
import SongsTogetherCard from "./SongsTogetherCard";
import MutualCollaborators from "./MutualCollaborators";

const DegreeOfSapereation = () => {
  return (
    <div className="mt-20 sm:mt-[126px]">
      <DegreeofSaperationHeader />
      <div className="flex flex-col sm:flex-row items-start mt-7 sm:mt-[46px] gap-3 justify-between max-w-[800px] w-full mx-auto">
        <SongsTogetherCard />
        <MutualCollaborators />
      </div>
      <Getstarted />
    </div>
  );
};

export default DegreeOfSapereation;
