import React from "react";

const Policy = () => {
  return (
    <div className="w-full py-20 top-[50px] mb-[50px] relative bg-gradient-to-b from-gray-800 to-black dark:from-gray-900 dark:to-black light:bg-gradient-to-b from-gray-100 to-white">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] m-auto text-center">
        {/* Header */}
        <h1 className="text-[32px] md:text-[42px] lg:text-[50px] font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400 dark:text-white">
          LearnEra <span className="text-teal-400">Policies</span>
        </h1>
        <p className="mt-4 text-lg text-dark-800 dark:text-gray-100">
          Welcome to{" "}
          <span className="font-semibold text-teal-400">LearnEra</span>. Your
          privacy and satisfaction are our top priorities. Please review our
          policies below.
        </p>

        {/* Policy Sections */}
        <div className="mt-10 bg-gray-800 dark:bg-gray-900 light:bg-white shadow-xl rounded-lg p-6 md:p-10 text-left text-gray-100 dark:text-gray-100">
          {/* Privacy Policy */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
              Privacy Policy
            </h2>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
              Your data privacy is important to us. We collect and process
              information in accordance with global data protection laws. We do
              not share your personal information with third parties without
              your consent.
              <br />✅ **Collected Data:** Name, Email, Payment Information
              (encrypted) ✅ **Usage:** To provide course access, personalize
              experience, and improve services ✅ **Your Rights:** You can
              request data deletion at any time.
            </p>
          </div>

          {/* Terms of Service */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
              Terms of Service
            </h2>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
              By using{" "}
              <span className="font-semibold text-teal-300 dark:text-teal-200">
                eLearning
              </span>
              , you agree to:
              <br />✅ **Respect Copyrights:** Course materials are for personal
              use only ✅ **Fair Usage:** Do not share login credentials ✅
              **Compliance:** Follow all community guidelines and policies.
              Failure to comply may result in account suspension.
            </p>
          </div>

          {/* Refund Policy */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
              Refund Policy
            </h2>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
              We offer a **7-day refund policy** for most courses.
              <br />✅ **Eligible Refunds:** If you're not satisfied, you can
              request a full refund within 7 days. ✅ **Non-Refundable:**
              Downloadable resources and certifications are non-refundable. ✅
              **How to Request:** Contact support with your order details.
            </p>
          </div>

          {/* Community Guidelines */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
              Community Guidelines
            </h2>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
              To maintain a **respectful and engaging** learning environment, we
              expect all users to:
              <br />✅ **Be Respectful:** Treat instructors and peers with
              kindness ✅ **No Spam:** Avoid promotional content in discussion
              forums ✅ **Constructive Feedback:** Help improve the platform
              with thoughtful suggestions. Violations may lead to warnings or
              account suspension.
            </p>
          </div>

          {/* Contact Support */}
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-white-900 dark:text-gray-300">
              Have Questions? Contact our support team at{" "}
              <span className="text-teal-500">support@LearnEra.com</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
