"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetLayoutByTypeQuery } from "../redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";
import { useGetAllCoursesQuery } from "../redux/features/courses/coursesApi";

const Page = () => {
  const searchParams = useSearchParams(); // Fetch the search parameters
  const search = searchParams?.get("title") || ""; // Get the "title" parameter if it exists

  // Fetch courses and categories data from API
  const { data, isLoading } = useGetAllCoursesQuery({});
  const { data: categoriesData } = useGetLayoutByTypeQuery("Categories", {});

  // Local state for category and filtered courses
  const [category, setCategory] = useState("All");
  const [courses, setCourses] = useState<any[]>([]); // Initialize empty array for courses

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
      if (search) {
        filteredCourses = filteredCourses.filter((course: any) =>
          course.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setCourses(filteredCourses); // Update the courses state
    }
  }, [data, category, search]); // Re-run effect when data, category, or search changes

  // Fetch categories from layout data
  const categories = categoriesData?.layout.categories;
  console.log("FEtched data", categories);

  return (
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-1">
              {courses &&
                courses.map((item: any, index: any) => (
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
