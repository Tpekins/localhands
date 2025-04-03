// src/pages/LandingPage.tsx
import React from "react";
import Navbar from "../../components/navabr";
import HeroSection from "../../components/herosection";
import MostPopularServices from "../../components/MostPopularServices";
import OutstandingFeatures from "../../components/OutstandingFeatures";
import Footer from "../../components/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <MostPopularServices />
      <OutstandingFeatures />
      {/* ...Add more sections as needed... */}
      <Footer />
    </div>
  );
};

export default LandingPage;
