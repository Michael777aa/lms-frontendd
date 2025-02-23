import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="relative top-[50px] bg-white dark:bg-slate-900">
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* About Section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-base text-black dark:text-gray-300 transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-base text-black dark:text-gray-300  transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300  transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/courses"
                    className="text-base text-black dark:text-gray-300 transition-colors"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-base text-black dark:text-gray-300  transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard"
                    className="text-base text-black dark:text-gray-300 transition-colors"
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links Section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Social Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.youtube.com"
                    className="text-base text-black dark:text-gray-300 transition-colors"
                  >
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com"
                    className="text-base text-black dark:text-gray-300  transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.github.com/Michael777a"
                    className="text-base text-black dark:text-gray-300 transition-colors"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white pb-3">
                Contact Info
              </h3>
              <p className="text-base text-black dark:text-gray-300 pb-2">
                Call Us: s23423423
              </p>
              <p className="text-base text-black dark:text-gray-300 pb-2">
                Address: +7011 Vermont Ave, Los Angeles, CA 90044
              </p>
              <p className="text-base text-black dark:text-gray-300 pb-2">
                Mail Us: hdsafdsfa
              </p>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="mt-8">
            <p className="text-center text-black dark:text-white text-sm">
              Copyright © 2023 ELearning | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
