"use client";

import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useLogOutQuery } from "@/app/redux/features/auth/authApi";
import { useGetAllCoursesQuery } from "@/app/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const { data } = useGetAllCoursesQuery(undefined, {});
  const [courses, setCourses] = useState([]);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) => {
          return data.courses.find(
            (course: any) => course._id === userCourse._id
          );
        })
        .filter((course: any) => course !== undefined); // Filter out undefined results

      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#fffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      ,{" "}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 relative top-[100px] 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
            {courses && courses.length > 0 ? (
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))
            ) : (
              <h1 className="text-center text-[18px] font-Poppins">
                You don't have any purchased courses!
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
