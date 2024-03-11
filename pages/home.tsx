import React from "react";
import Hero from "../components/home/Hero";
import Collabrators from "../components/home/Collabrators";
import Scrollbtn from "../components/home/Scrollbtn";
import Quicklysec from "../components/home/Quicklysec";
import SmartTools from "../components/home/SmartTools";
import PageSEO from "../components/icons/PageSEO";

const Home = () => {
  return (
    <>
      <PageSEO title="Home" />
      <Hero />
      <Collabrators />
      <Scrollbtn />
      <Quicklysec />
      <SmartTools />
    </>
  );
};

export default Home;
