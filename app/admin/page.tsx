"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/DashboardHero";

const Page = () => {
  return (
    <div>
      <Heading
        title={` Elearning - Admin`}
        description="this is platform for student to develop"
        keywords="programming ai machine learning"
      />
      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default Page;
