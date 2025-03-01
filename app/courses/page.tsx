"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetUsersAllCoursesQuery } from "../redux/features/courses/coursesApi";
import { useGetLayoutByTypeQuery } from "../redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetLayoutByTypeQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    } else {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }

    if (search) {
      setCourses((prevCourses) =>
        prevCourses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <div className="mt-[100px]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] max-w-[1200px] mx-auto min-h-[70vh]">
            <Heading
              title="All courses - Elearning"
              description="Elearning is a programming community."
              keywords="programming community, coding skills, expert insights, collaboration, growth"
            />
            <br />

            {/* Category Filter Section */}
            <div className="w-full flex items-center flex-wrap gap-3">
              <div
                className={`h-[40px] px-6 py-2 rounded-full cursor-pointer text-red font-semibold transition-colors duration-300 ${
                  category === "All" ? "bg-crimson" : "bg-[#5050cb]"
                } hover:bg-crimson`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`h-[40px] px-6 py-2 rounded-full cursor-pointer text-red font-semibold transition-colors duration-300 ${
                      category === item.title ? "bg-[#ff0000]" : "bg-[#5050cb]"
                    } hover:bg-[#ff0000]`}
                    onClick={() => setCategory(item.title)}
                  >
                    {item.title}
                  </div>
                ))}
            </div>

            {/* No Courses Found Message */}
            {courses && courses.length === 0 && (
              <p className="text-gray-500 text-xl text-center my-12">
                {search
                  ? "No courses found!"
                  : "No courses found in this category. Please try another one!"}
              </p>
            )}

            <br />
            <br />

            {/* Courses Grid Layout */}
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 1500px:grid-cols-5">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
