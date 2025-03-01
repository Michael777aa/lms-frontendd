"use client"; // Add this at the top of the importing file if needed

import React, { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="LearnEra"
        description="LearnEra is an innovative platform designed to empower students with the skills needed for the future. Offering courses in programming, AI, and machine learning, it provides a comprehensive learning experience for tech enthusiasts aiming to excel in their careers"
        keywords="online learning, programming courses, AI training, machine learning education, tech skills, future-proof education, student development, coding tutorials"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
