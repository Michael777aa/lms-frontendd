const About = () => {
  return (
    <div className="w-full py-20 top-[50px] mb-[50px] relative bg-gradient-to-b from-gray-800 to-black dark:from-gray-900 dark:to-black light:bg-gradient-to-b from-gray-100 to-white">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] m-auto text-center">
        {/* Header */}
        <h1 className="text-[32px] md:text-[42px] lg:text-[50px] font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400 dark:text-white">
          Welcome to <span className="text-teal-400">LearnEra</span> - Your
          Gateway to Success!
        </h1>
        <p className="mt-4 text-lg text-dark-900 dark:text-gray-100">
          Ready to **transform your career**?{" "}
          <span className="font-semibold text-teal-400">LearnEra</span> brings
          innovative courses that help you unlock your potential and build your
          future.
        </p>

        {/* Main Content Box */}
        <div className="mt-10 bg-gray-800 dark:bg-gray-900 light:bg-white shadow-xl rounded-lg p-6 md:p-10 text-left text-gray-100 dark:text-gray-100">
          <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
            Why Choose{" "}
            <span className="text-teal-300 dark:text-teal-200">LearnEra</span>?
          </h2>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
            In the fast-evolving world, **learning should be engaging, flexible,
            and impactful**. That's why we created{" "}
            <span className="font-semibold text-teal-300 dark:text-teal-200">
              LearnEra
            </span>
            , a platform that offers **interactive courses**, expert guidance,
            and real-world projects to keep you ahead.
          </p>

          <br />

          <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
            What Sets Us Apart?
          </h2>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
            ✅ **Comprehensive Course Library** Learn from beginner to advanced,
            covering programming, business, design, and more. <br />
            ✅ **Hands-On Experience** Our courses provide **real-world
            challenges** to ensure practical knowledge. <br />
            ✅ **Expert Guidance** Get personalized feedback from industry
            professionals with years of experience. <br />
            ✅ **Flexibility** Study at your own pace, available 24/7. <br />✅
            **Global Network** Join a worldwide community of learners.
          </p>

          <br />

          <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
            At{" "}
            <span className="font-semibold text-teal-300 dark:text-teal-200">
              LearnEra
            </span>
            , we are committed to empowering individuals to achieve their dreams
            by providing access to cutting-edge learning resources. Whether
            you're a student, professional, or aspiring expert, we are here to
            help you succeed.
          </p>

          <br />

          <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
            What You'll Gain
          </h2>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
            🎥 **Interactive Video Lessons** Learn from experienced instructors
            with detailed video guides. <br />
            💻 **Real-Life Coding Exercises** Challenge yourself with coding
            tasks designed to hone your skills. <br />
            📝 **Quizzes & Certifications** Assess your knowledge and earn
            valuable certificates recognized globally. <br />
            🤝 **Collaboration** Connect with peers, form study groups, and grow
            together in a global community.
          </p>

          <br />

          <h2 className="text-2xl font-bold text-teal-400 dark:text-teal-300">
            Join Us Today
          </h2>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed dark:text-gray-200">
            **The future of learning is digital**, and{" "}
            <span className="font-semibold text-teal-300 dark:text-teal-200">
              LearnEra
            </span>{" "}
            is here to guide you every step of the way. Unlock your potential,
            gain valuable skills, and turn your passions into a fulfilling
            career.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-10">
          <a
            href="/courses"
            className="px-6 py-3 bg-teal-500 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-teal-600 transition-all"
          >
            Start Learning Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
