import { useGetLayoutByTypeQuery } from "@/app/redux/features/layout/layoutApi";
import { styles } from "@/app/styles/style";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetLayoutByTypeQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq || []);
    }
  }, [data]);

  const toggleQuestion = (_id: string) => {
    setActiveQuestion((prev) => (prev === _id ? null : _id));
  };

  return (
    <div className="relative top-[50px] w-full">
      <div className="w-[90%] 800px:w-[80%] mx-auto">
        <h1 className={`${styles.title} text-center 800px:text-[40px] mb-8`}>
          Frequently Asked Questions
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions.map((q: any) => (
              <div
                key={q._id}
                className={`border-gray-200 pt-6 ${
                  q._id !== questions[0]?._id ? "border-t" : ""
                } ${
                  activeQuestion === q._id ? "bg-gray-50 dark:bg-gray-800" : ""
                }`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-center justify-between w-full text-left focus:outline-none p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition duration-200"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base font-Poppins text-black dark:text-white">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
