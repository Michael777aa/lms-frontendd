"use client";

import AllCourses from "@/app/components/Admin/Course/AllCourses";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import React from "react";

const Page = () => {
  return (
    <div>
      <Heading
        title={` Elearning - Admin`}
        description="this is platform for student to develop"
        keywords="programming ai machine learning"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero isDashboard={false} />
          <AllCourses />
        </div>
      </div>
    </div>
  );
};

export default Page;
