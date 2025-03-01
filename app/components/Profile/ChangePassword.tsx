"use client";
import { useUpdatePasswordMutation } from "@/app/redux/features/user/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const passwordChangeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      {/* Heading with dark mode support */}
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-gray-900 dark:text-white pb-2">
        Change Password
      </h1>

      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          {/* Old Password Input */}
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 text-gray-900 dark:text-white">
              Enter your old password
            </label>
            <input
              type="password"
              className="w-[95%] mb-4 800px:mb-0 p-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          {/* New Password Input */}
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 text-gray-900 dark:text-white">
              Enter your new password
            </label>
            <input
              type="password"
              className="w-[95%] mb-4 800px:mb-0 p-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 text-gray-900 dark:text-white">
              Confirm your new password
            </label>
            <input
              type="password"
              className="w-[95%] mb-4 800px:mb-0 p-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-5">
            <button
              type="submit"
              className="w-full md:w-[250px] h-[50px] bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
