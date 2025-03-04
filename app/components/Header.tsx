import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModel";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const user = useSelector((state: any) => state.auth.user);
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();

  useEffect(() => {
    if (!isLoading && !userData && data?.user?.email) {
      // If the user doesn't exist in your system, trigger socialAuth to register
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image,
      });
      refetch(); // Refresh user data after auth
    }
    if (data && isSuccess) {
      toast.success("Login successfully");
    }
  }, [data, userData, isSuccess, refetch, socialAuth]);

  const handleCloseSidebar = (e: any) => {
    if (e.target.id === "screen") {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="w-full relative">
      <div className="bg-white fixed top-0 left-0 w-full h-[80px] z-[80] border-b shadow-lg transition duration-300 dark:bg-slate-900 dark:border-[#fffffff1c]">
        <div className="w-[95%] 800px:w-[92%] m-auto py-3 h-full">
          <div className="w-full h-[80px] flex items-center justify-between">
            <Link
              href="/"
              className="text-[30px] font-Poppins font-[600] text-blue-600 dark:text-white"
            >
              LearnEra
            </Link>
            <div className="flex items-center space-x-6">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* Mobile Menu Icon */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={30}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setIsSidebarOpen(true)}
                />
              </div>
              {/* User Profile */}
              {user ? (
                <Link href="/profile">
                  <Image
                    src={user?.avatar?.url || avatar}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer border-2 border-transparent hover:border-blue-600 transition-all"
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={30}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000040] transition-all ease-in-out duration-300"
            onClick={handleCloseSidebar}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 transform transition-transform ease-in-out duration-300">
              <div className="flex justify-end p-4">
                <HiOutlineMenuAlt3
                  size={30}
                  className="cursor-pointer text-black dark:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </div>
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={30}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => setOpen(true)}
              />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright 2025 LearnEra
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
            route === "Login" ? Login : route === "Sign-Up" ? SignUp : null
          }
        />
      )}
    </div>
  );
};

export default Header;
