"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Policy from "./Policy";
import Footer from "../components/Footer";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(3);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Policy  - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming, mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Policy />
      <Footer />
    </div>
  );
};

export default Page;
