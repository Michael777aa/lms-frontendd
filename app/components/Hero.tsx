import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="w-full flex flex-col 1000px:flex-row items-center justify-between bg-gradient-to-b from-[#0c0c1d] to-[#0f0f24] min-h-screen px-6 1000px:px-20 pt-10">
      {/* Left Image Section */}
      <div className="1000px:w-1/2 flex justify-center items-center relative">
        <div className="w-[400px] h-[400px] 1000px:w-[500px] 1000px:h-[500px] bg-[#141432] rounded-full flex items-center justify-center">
          <img
            src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
            alt="Hero Banner"
            className="object-contain w-[90%] h-auto"
          />
        </div>
      </div>

      {/* Right Content Section */}
      <div className="1000px:w-1/2 flex flex-col items-center 1000px:items-start text-center 1000px:text-left mt-10 1000px:mt-0">
        <h2 className="text-white text-[36px] 1000px:text-[50px] font-bold leading-tight">
          Improve Your Online Learning Experience Better Instantly
        </h2>

        <p className="text-gray-400 text-lg mt-4">
          We have{" "}
          <span className="text-white font-semibold">40k+ Online courses</span>{" "}
          &{" "}
          <span className="text-white font-semibold">
            500K+ Online registered students
          </span>
          . Find your desired courses from them.
        </p>

        {/* Search Box */}
        <div className="w-full 1000px:w-[80%] mt-6 relative flex items-center">
          <input
            type="search"
            placeholder="Search Courses..."
            className="w-full h-12 bg-[#1d1d2b] border border-[#575757] rounded-lg pl-4 text-white placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <BiSearch size={22} />
          </button>
        </div>

        {/* Trusted Users Section */}
        <div className="mt-6 flex items-center space-x-4">
          <div className="flex -space-x-2">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User 1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="User 2"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/women/46.jpg"
              alt="User 3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <p className="text-gray-300 text-md">
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
