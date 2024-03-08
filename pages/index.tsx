import React from "react";
import Navbar from "../components/main/navbar";
import SearchComponent from "../components/main/search";

const Homepage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold mb-4">Smart Music Credits</h1>
        <div className="flex justify-center w-full max-w-l md:max-w-xl lg:max-w-[951px] ">
          <SearchComponent />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
