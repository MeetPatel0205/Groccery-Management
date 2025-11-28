import React, { useEffect } from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Carousel />
      <Footer/>
    </>
  );
};

export default Home;
