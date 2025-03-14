import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import Ratings from "@/app/utils/Ratings";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={isProfile ? `/course-access/${item._id}` : `/course/${item._id}`}
    >
      <div className="w-full min-h-[30vh] dark:bg-slate-800 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] rounded-lg p-4 transition-all duration-300 ease-in-out transform  hover:shadow-xl shadow-lg bg-white dark:bg-[#2A2A2A]">
        <div className="relative w-full h-60">
          <Image
            src={item?.thumbnail?.url}
            alt={item.name || "Course Thumbnail"}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <h1 className="font-Poppins text-lg sm:text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2 line-clamp-2">
          {item.name}
        </h1>

        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.ratings} />

          <h5
            className={`text-sm sm:text-sm text-gray-600 dark:text-gray-300 ${
              isProfile ? "hidden 800px:inline" : ""
            }`}
          >
            {item.purchased} Students
          </h5>
        </div>

        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.price === 0 ? "Free" : `${item.price}$`}
            </h3>
            {item.estimatedPrice && (
              <h5 className="pl-3 text-sm mt-[5px] line-through opacity-70 text-gray-500 dark:text-gray-400">
                {item.estimatedPrice}$
              </h5>
            )}
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-sm sm:text-sm text-gray-600 dark:text-gray-300">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
