"use client";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import EditHero from "@/app/components/Admin/Customization/EditHero";

const Page = () => {
  return (
    <div>
      <Heading
        title={`Elearning - Admin`}
        description="this is platform for student to develop"
        keywords="programming ai machine learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditHero />
        </div>
      </div>
    </div>
  );
};

export default Page;
