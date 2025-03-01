import { useGetUsersAllCoursesQuery } from "@/app/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

const Courses = () => {
  const { data } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className="w-full px-4 md:px-8">
      <div className="w-full max-w-screen-xl mx-auto">
        <h1 className="text-center font-Poppins text-2xl sm:text-3xl lg:text-4xl dark:text-white font-semibold leading-tight sm:leading-snug lg:leading-[60px] mt-6 sm:mt-8 lg:mt-10 mb-6 sm:mb-8 lg:mb-10">
          Expand Your Career <span className="text-gradient">Opportunity</span>{" "}
          <br />
          With Our Courses
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10 mb-12">
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
