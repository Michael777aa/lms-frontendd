import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "./Loader/Loader";
import { useRouter } from "next/navigation";
import { useGetLayoutByTypeQuery } from "../redux/features/layout/layoutApi";

const Hero = () => {
  const { data, isLoading, isError, error, refetch } = useGetLayoutByTypeQuery(
    "Banner",
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Add check if data is undefined
  const banner = data?.layout?.banner;

  useEffect(() => {
    // Only refetch when there is data (optional, can be handled differently)
    if (data) {
      refetch();
    }
  }, [data, refetch]);

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  if (isLoading) return <Loader />;

  // If there is an error, handle it gracefully

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#2c3e50] to-[#34495e]">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${banner?.image?.url})` }}
      ></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 md:px-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          {banner?.title || "Welcome to Our Platform"}
        </h1>
        <p className="mt-4 text-lg text-center max-w-2xl">
          {banner?.subTitle ||
            "Find the best courses to boost your career and skills."}
        </p>

        {/* Search Box */}
        <div className="mt-8 w-full max-w-xl relative">
          <input
            type="search"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder="Search Courses..."
            className="w-full h-14 bg-[#1d1d2b] border border-[#575757] rounded-lg pl-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <BiSearch size={22} />
          </button>
        </div>

        {/* Trusted Users Section */}
        <div className="mt-12 flex justify-center items-center space-x-4">
          <div className="flex -space-x-2">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User 1"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="User 2"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/women/46.jpg"
              alt="User 3"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
          </div>
          <p className="text-gray-300 text-lg ml-4">
            <span className="text-white font-semibold">500K+</span> People
            already trusted us.{" "}
            <Link
              href="/courses"
              className="text-green-400 font-semibold hover:underline"
            >
              View Courses
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
