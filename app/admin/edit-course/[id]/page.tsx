"use client";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import DashboardHeader from "../../../components/Admin/DashboardHeader";
import EditCourse from "@/app/components/Admin/Course/EditCourse";

const Page = ({ params }: any) => {
  const id = params?.id;

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
          {/* <CreateCourse /> */}
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
