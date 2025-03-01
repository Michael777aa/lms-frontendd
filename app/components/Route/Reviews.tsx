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
      "This experience was truly transformative. It helped me grow as a person, taught me patience, and opened my mind to new possibilities. I am grateful for the journey.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Marketing Specialist | Quarter Ltd.",
    comment:
      "Ive learned so much about myself. The personal growth Ive experienced has made me feel more grounded and confident. Its been a rewarding journey.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Travel Blogger | Zimbabwe",
    comment:
      "This has been an amazing experience. It gave me a new perspective on life and encouraged me to push myself further. I feel more motivated and excited for the future.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Creative Director | Indonesia",
    comment:
      "I cant express how much this experience has impacted me. I feel more focused and driven than ever. Ive learned that growth doesnt always come easy, but its always worth it.",
  },
  {
    name: "Liam Johnson",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    profession: "Photographer | New York",
    comment:
      "A real eye-opener. It taught me the importance of stepping out of my comfort zone and embracing change. Ive grown so much, and Im more excited for whats next.",
  },
  {
    name: "Olivia Brown",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Chef | London",
    comment:
      "This experience has been a great reminder that we are always evolving. Ive learned to embrace challenges and stay positive, no matter what comes my way.",
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
            Your Future Begins Today
          </h3>
          <p
            className={`${styles.label} text-base sm:text-lg mt-4 text-gray-700 dark:text-gray-300`}
          >
            "Every journey begins with a single step, and every small effort
            adds up to great achievements. You have the potential to transform
            your dreams into reality, and today is the perfect day to start. No
            matter where you are or where you have been, your path is yours to
            shape. Keep pushing forward, and success will follow."
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
