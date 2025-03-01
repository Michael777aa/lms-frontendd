import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetAllCoursesQuery } from "@/app/redux/features/courses/coursesApi";

const Courses = () => {
  const { data } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className="w-full relative pb-4 px-4 bottom-[30px] md:px-8 bg-[#F5F5F5] dark:bg-[#121212]">
      <div className="w-full max-w-screen-xl mx-auto">
        <h1 className="text-center font-Poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white my-8 leading-tight pt-5">
          Expand Your Career <span className="text-gradient">Opportunity</span>
          <br />
          With Our Courses
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-1">
          {courses &&
            courses.map((item: any, index: any) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
