"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../public/assets/default-user.png";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/app/redux/features/user/userApi";
import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  useLoadUserQuery(undefined, { skip: !loadUser });

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (fileReader.readyState === 2) {
        updateAvatar(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
      toast.success("Profile updated successfully");
    }
    if (error || updateError) {
      toast.error("Failed to update profile");
      console.log(error || updateError);
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() !== "") {
      editProfile({ name });
    } else {
      toast.error("Name cannot be empty");
    }
  };

  return (
    <div className="w-full flex flex-row items-center justify-between py-12 px-6 max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="w-full max-w-[500px] bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl backdrop-blur-xl bg-opacity-80 dark:bg-opacity-60 border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Edit Profile
        </h2>
        <form className="space-y-6 mt-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block pb-2 font-medium text-gray-600 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Address (Read-Only) */}
          <div>
            <label className="block pb-2 font-medium text-gray-600 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white cursor-not-allowed transition-all opacity-75"
              required
              readOnly
              value={user?.email || "Not Provided"}
            />
          </div>

          {/* Update Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-[250px] h-[50px] bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Profile Avatar Section */}
      <div className="relative w-[150px] h-[150px]">
        <div className="absolute -top-2 -left-2 w-[160px] h-[160px] rounded-full "></div>
        <Image
          src={user?.avatar?.url || avatar || avatarIcon}
          alt="User Avatar"
          width={150}
          height={150}
          className="rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-lg transition-transform duration-300 hover:scale-110"
        />
        {/* Camera Icon */}
        <label
          htmlFor="avatar"
          className="absolute bottom-3 right-3 flex items-center justify-center w-[42px] h-[42px] bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md cursor-pointer transition-transform hover:scale-110"
        >
          <AiOutlineCamera size={22} />
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
