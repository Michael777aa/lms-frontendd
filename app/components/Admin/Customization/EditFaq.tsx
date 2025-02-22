import {
  useEditLayoutMutation,
  useGetLayoutByTypeQuery,
} from "@/app/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

const EditFaq = () => {
  const { data, refetch } = useGetLayoutByTypeQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false); // For hydration sync
  const [editLayout, { isLoading, isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  // Render only on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // When FAQ data is fetched, map over it to ensure each item has a unique _id.
  useEffect(() => {
    if (data) {
      const faqWithIds = data.layout.faq.map((q: any, index: number) => ({
        ...q,
        _id: q._id || `${Date.now()}-${index}`, // Generate a unique ID if missing
      }));
      setQuestions(faqWithIds);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Error updating FAQ");
      }
    }
  }, [data, layoutSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  // Create a new FAQ with a unique _id
  const newFaqHandler = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        _id: Date.now(), // Unique temporary id
        question: "",
        answer: "",
        active: true, // Open for editing
      },
    ]);
  };

  // Check if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  // Check if any FAQ field is empty (after trimming whitespace)
  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some(
      (q) => q.question.trim() === "" || q.answer.trim() === ""
    );
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data || [], questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  if (!isClient) return null;

  return (
    <div className="max-w-4xl mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Edit FAQs
      </h1>
      <dl className="space-y-6">
        {questions.map((q: any, index) => (
          <div
            key={q._id || index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition duration-200 hover:shadow-md"
          >
            <dt className="flex items-center justify-between">
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(q._id, e.target.value)}
                placeholder="Enter your question..."
                className="w-full bg-transparent text-lg text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                onClick={() => toggleQuestion(q._id)}
                className="ml-4 text-gray-500 dark:text-gray-300 focus:outline-none"
              >
                {q.active ? (
                  <HiMinus className="h-6 w-6" />
                ) : (
                  <HiPlus className="h-6 w-6" />
                )}
              </button>
            </dt>
            {q.active && (
              <dd className="mt-3 flex items-center">
                <input
                  type="text"
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full bg-transparent text-gray-700 dark:text-gray-200 focus:outline-none"
                />
                <button
                  onClick={() =>
                    setQuestions((prevQuestions) =>
                      prevQuestions.filter((item) => item._id !== q._id)
                    )
                  }
                  className="ml-4 text-red-500 hover:text-red-600 focus:outline-none"
                >
                  <AiOutlineDelete className="h-5 w-5" />
                </button>
              </dd>
            )}
          </div>
        ))}
      </dl>
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={newFaqHandler}
          className="flex items-center text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          <IoMdAddCircleOutline className="h-6 w-6 mr-2" />
          <span>Add FAQ</span>
        </button>
        <button
          onClick={handleEdit}
          className={`px-4 py-2 rounded font-semibold text-white transition-colors duration-200 focus:outline-none ${
            areQuestionsUnchanged(data?.layout?.faq || [], questions) ||
            isAnyQuestionEmpty(questions)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"
          }`}
          disabled={
            areQuestionsUnchanged(data?.layout?.faq || [], questions) ||
            isAnyQuestionEmpty(questions)
          }
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditFaq;
