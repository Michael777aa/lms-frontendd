"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useGetLayoutByTypeQuery } from "../redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";
import { useGetAllCoursesQuery } from "../redux/features/courses/coursesApi";

// Interface for type safety
interface Course {
  id: number;
  name: string;
  categories: string[];
  // Add any other properties of a course here
}

const Page = () => {
  // Fetch courses and categories data from API
  const { data, isLoading } = useGetAllCoursesQuery({});
  const { data: categoriesData } = useGetLayoutByTypeQuery("Categories", {});

  // Local state for category and filtered courses
  const [category, setCategory] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]); // Initialize empty array for courses

  useEffect(() => {
    if (data) {
      // Filter courses based on category and search query
      let filteredCourses = data?.courses;

      // Filter by category
      if (category !== "All") {
        filteredCourses = filteredCourses.filter(
          (course: any) => course.categories === category
        );
      }

      // Filter by search query

      setCourses(filteredCourses); // Update the courses state
    }
  }, [data, category]); // Re-run effect when data, category, or search changes

  // Fetch categories from layout data
  const categories = categoriesData?.layout.categories;

  return (
    <Suspense>
      {" "}
      <div className="mt-[100px]">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Header
              route="Login"
              setRoute={() => {}}
              open={false}
              setOpen={() => {}}
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
                        category === item.title
                          ? "bg-[#ff0000]"
                          : "bg-[#5050cb]"
                      } hover:bg-[#ff0000]`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  ))}
              </div>

              {/* No Courses Found Message */}
              {courses.length === 0 && (
                <p className="text-gray-500 text-xl text-center my-12"></p>
              )}

              <br />
              <br />

              {/* Courses Grid Layout */}
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 1500px:grid-cols-5">
                {courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Suspense>
  );
};

export default Page;
