"use client";

import Loader from "@/app/components/Loader/Loader";

import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import CourseContent from "../../components/Course/CourseContent";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;

  return (
    <>
      <div>
        <CourseContent id={id} />
      </div>
    </>
  );
};

export default Page;
