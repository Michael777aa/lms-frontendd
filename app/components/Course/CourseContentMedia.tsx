import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user.id
  );
  return (
    <div className="w-[95%] 800px:w-[86%] py-6 m-auto">
      {/* Course Player */}
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-between my-5">
        {/* Prev Lesson */}
        <button
          className={`min-h-[42px] px-5 py-2 rounded-lg flex items-center gap-3 font-medium 
          transition-all duration-300 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700
          disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
          disabled={activeVideo === 0}
        >
          <AiOutlineArrowLeft className="text-lg" />
          Prev Lesson
        </button>

        {/* Next Lesson */}
        <button
          className={`min-h-[42px] px-5 py-2 rounded-lg flex items-center gap-3 font-medium 
          transition-all duration-300 text-white bg-green-500 hover:bg-green-600 active:bg-green-700
          disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() =>
            setActiveVideo(
              data.length - 1 !== activeVideo ? activeVideo + 1 : activeVideo
            )
          }
          disabled={data.length - 1 === activeVideo}
        >
          Next Lesson
          <AiOutlineArrowRight className="text-lg" />
        </button>
      </div>

      {/* Lesson Title */}
      <h1 className="pt-4 text-[28px] font-semibold text-gray-900 dark:text-white">
        {data[activeVideo]?.title}
      </h1>

      {/* Tab Navigation */}
      <div className="w-full flex items-center gap-5 border-b pb-2">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`text-[16px] 800px:text-[20px] font-medium px-5 py-2 rounded-md transition-all cursor-pointer
          ${
            activeBar === index
              ? "text-white bg-blue-500 shadow-md"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeBar === 0 && (
          <p className="text-[18px] leading-relaxed whitespace-pre-line mb-3">
            {data[activeBar]?.description}
          </p>
        )}

        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links.map((item: any, index: any) => (
              <div key={index} className="mb-5">
                <h2 className="800px:text-[20px] inline-block">
                  {item.title && `${item.title} + " :"`}
                </h2>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}

        {activeBar === 2 && (
          <>
            <div className="flex items-start w-full gap-4 p-3  rounded-lg shadow-md">
              <Image
                width={50}
                height={50}
                alt=""
                className="rounded-full w-[50px] h-[50px] object-cover"
                src={
                  user?.avatar?.url ||
                  "data:image/jpeg;base64,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"
                }
                loading="lazy"
              />
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="Write your question..."
                className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
              />{" "}
            </div>
            <div className="w-full flex justify-end">
              <div className={`${styles.button} !h-[40px] text-[18px] mt-5`}>
                Submit
              </div>
            </div>
            <br />
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]">
              <div>{/* questionReply */}</div>
            </div>
          </>
        )}

        {activeBar === 3 && (
          <div className="w-full">
            <>
              {!isReviewExists && (
                <>
                  <div className="flex w-full">
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover"
                      src={
                        user?.avatar?.url ||
                        "data:image/jpeg;base64,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"
                      }
                      loading="lazy"
                    />
                    <div className="w-full">
                      <h5 className="pl-3 text-[20px] font-[500] darKtext-white text-black">
                        Give a Rating <span className="text-red-500">*</span>
                      </h5>
                      <div className="flex w-full ml-2 pb-3">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246, 186, 0)"
                              size={25}
                              onClick={() => setRating(i)} // Set the rating to the clicked star's index
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246, 186, 0)"
                              size={25}
                              onClick={() => setRating(i)} // Set the rating to the clicked star's index
                            />
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="Write your comment..."
                        className="outline-none bg-transparent ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div
                      className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 
                    
                      }`}
                    >
                      Submit
                    </div>
                  </div>
                </>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContentMedia;
