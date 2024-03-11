import React, { useState } from "react";
import PlayListsTab from "./PlayListsTab";

const HomeNavTabs = () => {
  const [activeTab, setActiveTab] = useState("PLAYLISTS");
  return (
    <div className="mt-[47px] max-w-[951px] px-3 lg:px-0 w-full mx-auto">
      <div className=" flex gap-3 whitespace-nowrap overflow-auto pb-2 sm:gap-6 items-center mb-5 sm:mb-10">
        <button
          onClick={() => setActiveTab("PLAYLISTS")}
          className={`${
            activeTab === "PLAYLISTS" ? "text-[#565656]" : "text-[#565656]/40"
          } text-[15px] font-semibold font-inter `}
        >
          PLAYLISTS
        </button>
        <button
          onClick={() => setActiveTab("TRENDING")}
          className={`${
            activeTab === "TRENDING" ? "text-[#565656]" : "text-[#565656]/40"
          } text-[15px] font-semibold font-inter `}
        >
          TRENDING SEARCHES
        </button>
        <button
          onClick={() => setActiveTab("ADVANCED")}
          className={`${
            activeTab === "ADVANCED" ? "text-[#565656]" : "text-[#565656]/40"
          } text-[15px] font-semibold font-inter `}
        >
          ADVANCED SEARCH
        </button>
      </div>
      {activeTab === "PLAYLISTS" && <PlayListsTab />}
      {activeTab === "TRENDING" && <PlayListsTab />}
      {activeTab === "ADVANCED" && <PlayListsTab />}
    </div>
  );
};

export default HomeNavTabs;
