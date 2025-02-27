"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModel";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../public/assets/default-user.png";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const user = useSelector((state: any) => state.auth.user);
  const { data } = useSession();
  const [logout, setLogout] = useState(false);
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
        refetch();
      }
    }
    if (data == null) {
      if (isSuccess) {
        toast.success("Login successfully");
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [data, userData, isSuccess]);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`bg-white fixed top-0 left-0 w-full h-[80px] z-[80] border-b shadow-xl transition duration-500 dark:bg-slate-900 dark:border-[#fffffff1c]`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between">
            <Link
              href="/"
              className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
            >
              ELearning
            </Link>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* Mobile Menu */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user?.avatar?.url || avatar}
                    alt="User Avatar"
                    width={30}
                    height={30}
                    className="rounded-full cursor-pointer"
                    style={{
                      display: "overflow",
                      border: activeItem === 5 ? "2px solid #ffc107" : "",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => setOpen(true)}
              />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright 2025 ELearning
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modals */}
      {open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          refetch={refetch}
          component={
            route === "Login"
              ? Login
              : route === "Sign-Up"
              ? SignUp
              : Verification
          }
        />
      )}

      {/* Video Chat */}
      {/* <div>
        <button
          onClick={() => setShowVideoChat((prev) => !prev)}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg mt-2"
        >
          {showVideoChat ? "Close Video Chat" : "Open Video Chat"}
        </button>
        {showVideoChat && <VideoChat />}
      </div> */}
    </div>
  );
};

export default Header;
