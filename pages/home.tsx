import React from "react";
import Hero from "../components/home/Hero";
import Collabrators from "../components/home/Collabrators";
import Scrollbtn from "../components/home/Scrollbtn";
import Quicklysec from "../components/home/Quicklysec";
import SmartTools from "../components/home/SmartTools";

const Home = () => {
  return (
    <div>
      <Hero />
      <Collabrators />
      <Scrollbtn />
      <Quicklysec />
      <SmartTools />
    </div>
  );
};

export default Home;
