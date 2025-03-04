import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const [user, setUser] = useState<any>();
  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
  const [open, setOpen] = useState(false);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);
  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <div className="w-full">
      {/* Course Details Container */}
      <div className="w-[90%] mx-auto py-8">
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Left Section - Course Info */}
          <div className="w-full md:w-[65%]">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex justify-between items-center pt-3">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <span className="ml-2 text-black dark:text-white">
                  {data?.reviews?.length} Reviews
                </span>
              </div>
              <h5 className="text-black dark:text-white">
                {data?.purchased} Students
              </h5>
            </div>

            {/* Benefits */}
            <section className="pt-6">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                What You'll Learn
              </h2>
              <ul className="mt-4">
                {data?.benefits?.map((item: any, index: number) => (
                  <li key={index} className="flex items-center py-2">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-green-600"
                    />
                    <span className="pl-3 text-black dark:text-white">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Prerequisites */}
            <section className="pt-6">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                Prerequisites
              </h2>
              <ul className="mt-4">
                {data?.prerequisites?.map((item: any, index: number) => (
                  <li key={index} className="flex items-center py-2">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-yellow-500"
                    />
                    <span className="pl-3 text-black dark:text-white">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Course Overview */}
            <section className="pt-6">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                Course Overview
              </h2>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </section>

            {/* Full Course Description */}
            <section className="pt-6">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                Course Details
              </h2>
              <p className="mt-4 text-lg text-black dark:text-white">
                {data?.description}
              </p>
            </section>

            {/* Reviews */}
            <section className="pt-6">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                Course Reviews
              </h2>
              {data?.reviews?.map((item: any, index: number) => (
                <div key={index} className="flex items-start py-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white">
                    {item.user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="pl-4 flex-1">
                    <div className="flex justify-between">
                      <h5 className="text-xl text-black dark:text-white">
                        {item.user.name}
                      </h5>
                      <Ratings rating={item.rating} />
                    </div>
                    <p className="mt-2 text-black dark:text-white">
                      {item.comment}
                    </p>
                    <small className="text-gray-600 dark:text-gray-400">
                      {format(item.createdAt)}
                    </small>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Right Section - Purchase & Player */}
          <div className="w-full md:w-[35%] sticky top-[100px]">
            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
            <div className="pt-5">
              <h3 className="text-3xl text-black dark:text-white">
                {data?.price === 0 ? "Free" : `$${data?.price}`}
              </h3>
              <h5 className="text-lg text-gray-500 line-through">
                {data?.estimatedPrice}$
              </h5>
              <span className="text-xl font-semibold text-red-500">
                {discountPercentage}% Off
              </span>
            </div>

            {/* Buy Now Button */}
            <div className="mt-6">
              {isPurchased ? (
                <Link href={`/course-access/${data?._id}`} passHref>
                  <button className={`${styles.button} !w-full`}>
                    Enter Course
                  </button>
                </Link>
              ) : (
                <button
                  className={`${styles.button} !w-full`}
                  onClick={handleOrder}
                >
                  Buy Now - {data?.price}$
                </button>
              )}
            </div>

            {/* Course Perks */}
            <div className="pt-6">
              <ul className="text-black dark:text-white">
                <li>• Source code included</li>
                <li>• Lifetime access</li>
                <li>• Certificate of completion</li>
                <li>• Premium Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[500px] bg-white rounded-xl p-6">
            <div className="flex justify-end">
              <IoCloseOutline
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer text-black"
              />
            </div>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckOutForm setOpen={setOpen} data={data} user={user} />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
