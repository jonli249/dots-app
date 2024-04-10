import React from "react";
import Navbar from "../components/main/navbar";
import SearchComponent from "../components/main/search";
import HomeNavTabs from "../components/main/HomeNavTabs";
import PageSEO from "../components/icons/PageSEO";

const Homepage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <PageSEO title="" />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold px-4 md:px-6 lg:px-8">Smart Music Credits</h1>
        <div className="flex justify-center md:h-[81px] w-full mt-[57px] max-w-l md:max-w-xl lg:max-w-[951px] mb-60">
          <SearchComponent />
        </div>
        {/* <HomeNavTabs /> */}
      </div>

    </div>
  );
};

export default Homepage;
