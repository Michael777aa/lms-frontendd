import { useGetLayoutByTypeQuery } from "@/app/redux/features/layout/layoutApi";
import { styles } from "@/app/styles/style";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

const FAQ = () => {
  const { data } = useGetLayoutByTypeQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null); // Changed to number | null for index type
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq); // Load FAQ data from the API response
    }
  }, [data]);

  // Function to toggle a question by index
  const toggleQuestion = (index: number) => {
    setActiveQuestion((prev) => (prev === index ? null : index)); // Only toggle one question
  };

  return (
    <div className="w-full max-w-4xl pb-5 mx-auto mt-32">
      <h1
        className={`${styles.title} text-3xl sm:text-4xl font-semibold text-center`}
      >
        Frequently Asked Questions
      </h1>
      <div className="mt-10">
        <dl className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index} // Using index as the unique key
              className={`${index !== 0 && "border-t"} border-gray-300 pt-6`}
            >
              <dt className="text-xl">
                <button
                  className="flex items-center justify-between w-full text-left text-gray-800 dark:text-white hover:text-yellow-500 focus:outline-none transition-all duration-300"
                  onClick={() => toggleQuestion(index)} // Toggle by question index
                >
                  <span className="font-medium">{q.question}</span>
                  <span className="ml-4 flex-shrink-0">
                    {activeQuestion === index ? (
                      <HiMinus className="h-6 w-6 text-gray-800 dark:text-white" />
                    ) : (
                      <HiPlus className="h-6 w-6 text-gray-800 dark:text-white" />
                    )}
                  </span>
                </button>
              </dt>
              {activeQuestion === index && (
                <dd className="mt-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md">
                  <p className="text-base text-gray-700 dark:text-gray-300">
                    {q.answer}
                  </p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
