import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">About</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.github.com/Michael777a"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-gray-400">Phone: +234 234 234</p>
            <p className="text-gray-400">Email: example@example.com</p>
            <p className="text-gray-400">
              Address: 7011 Vermont Ave, Los Angeles, CA 90044
            </p>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2023 ELearning | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
