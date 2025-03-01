import React from "react";
import Image from "next/image";
import { styles } from "@/app/styles/style";
import ReviewCard from "../Review/ReviewCard";
import ImageHigh from "../../public/assets/imagehigh.avif";
const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full Stack Developer | Quarter Ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Computer Systems Engineering Student | Zimbabwe",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
];

const Reviews = () => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center gap-6">
        {" "}
        {/* Added gap for spacing between image and text */}
        {/* Left Side - Image */}
        <div className="800px:w-[50%] w-full">
          <Image
            src={ImageHigh}
            alt="business"
            width={700}
            height={700}
            className="rounded-lg shadow-lg" // Added rounded corners and shadow for better visuals
          />
        </div>
        {/* Right Side - Text Content */}
        <div className="800px:w-[50%] w-full">
          <h3
            className={`${styles.title} text-2xl sm:text-3xl lg:text-4xl font-semibold text-black dark:text-white leading-tight 800px:!text-[30px]`}
          >
            Our Students Are <span className="text-gradient">Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <p
            className={`${styles.label} text-base sm:text-lg mt-4 text-gray-700 dark:text-gray-300`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
            voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
            possimus magni deleniti natus accusamus officiis quasi nihil
            commodi, praesentium quidem, quis doloribus?
          </p>
        </div>
      </div>
      <br />

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-[35px] mb-12">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
