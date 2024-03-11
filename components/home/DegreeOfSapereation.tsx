import React from "react";
import Getstarted from "./Getstarted";
import DegreeofSaperationHeader from "./DegreeofSaperationHeader";
import SongsTogetherCard from "./SongsTogetherCard";
import MutualCollaborators from "./MutualCollaborators";

const DegreeOfSapereation = () => {
  return (
    <div className="mt-10 sm:mt-20 md:mt-[105px] 2xl:mt-[126px]">
      <DegreeofSaperationHeader />
      <div className="max-w-[690px] lg:max-w-[765px] w-full px-4 flex flex-col sm:flex-row items-center sm:items-start sm:mt-5 md:mt-6 2xl:mt-5 gap-3 justify-between mx-auto">
        <SongsTogetherCard />
        <MutualCollaborators />
      </div>
      <Getstarted />
    </div>
  );
};

export default DegreeOfSapereation;
