const About = () => {
  return (
    <div className="w-full py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] m-auto text-center">
        {/* Header */}
        <h1 className="text-[32px] md:text-[42px] lg:text-[50px] font-bold leading-tight text-gray-900">
          Welcome to <span className="text-blue-600">eLearning</span> Where
          Knowledge Meets Innovation!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Are you ready to **transform your skills** and unlock endless
          opportunities?
          <span className="font-semibold text-blue-500">eLearning</span> is
          designed for individuals who seek to learn, grow, and excel in the
          digital world.
        </p>

        {/* Main Content Box */}
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6 md:p-10 text-left">
          <h2 className="text-2xl font-semibold text-blue-600">
            Why Choose eLearning?
          </h2>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed">
            In todays fast-paced world, **learning should be accessible,
            engaging, and effective**. Thats why we created{" "}
            <span className="font-semibold text-blue-500">eLearning</span>, a
            platform that provides **high-quality education** through
            interactive courses, expert-led tutorials, and hands-on projects.
          </p>

          <br />

          <h2 className="text-2xl font-semibold text-blue-600">
            What Makes Us Different?
          </h2>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed">
            ✅ **Comprehensive Course Library** From **beginner** to
            **advanced**, we offer structured lessons in programming, design,
            business, and more. ✅ **Hands-On Learning** Learn by doing! Our
            courses include **real-world projects** and coding exercises. ✅
            **Expert Mentorship** Gain insights and support from **industry
            professionals** with years of experience. ✅ **Flexible Learning
            Paths** Study at your own pace with 24/7 access to all materials. ✅
            **Global Community**Connect with learners worldwide and share
            knowledge.
          </p>

          <br />

          <h2 className="text-2xl font-semibold text-blue-600">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed">
            Our goal is to **empower learners** with the tools they need to
            succeed in their careers. Whether you're a **student, a working
            professional, or a self-learner**,
            <span className="font-semibold text-blue-500">eLearning</span>{" "}
            provides the right resources to help you achieve your dreams.
          </p>

          <br />

          <h2 className="text-2xl font-semibold text-blue-600">
            What Youll Learn
          </h2>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed">
            🎥 **Engaging Video Lessons** Step-by-step tutorials by top
            instructors. 💻 **Interactive Coding Challenges** Apply what you
            learn through live coding exercises. 📝 **Quizzes & Certifications**
            Track your progress and earn industry-recognized certificates. 🤝
            **Collaboration & Networking** Join study groups and interact with
            like-minded learners.
          </p>

          <br />

          <h2 className="text-2xl font-semibold text-blue-600">
            Join Us Today!
          </h2>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed">
            The **future of education is digital**, and
            wNsAAAAAAAAAAAAAAAAABXeq1mup4kT19Jb6rEQvtblvQ6lx92JXf here to guide
            you every step of the way. Take control of your learning journey,
            build your expertise, and **turn your passion into a profession**.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-10">
          <a
            href="/courses"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all"
          >
            Start Learning Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
