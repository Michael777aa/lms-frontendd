import React from "react";
import {
  AreaChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import Loader from "../../Loader/Loader";
import {
  useGetCoursesAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/app/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading, isError } = useGetUsersAnalyticsQuery({});

  // const analyticsData: any = [
  //   { name: "January", count: 405 },
  //   { name: "February", count: 60 },
  //   { name: "March", count: 78 },
  //   { name: "April", count: 55 },
  //   { name: "May", count: 90 },
  //   { name: "June", count: 110 },
  //   { name: "July", count: 85 },
  //   { name: "August", count: 95 },
  //   { name: "September", count: 120 },
  //   { name: "October", count: 130 },
  //   { name: "November", count: 100 },
  //   { name: "December", count: 140 },
  // ];

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  console.log("Fetched Data", analyticsData);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard ? "!text-[20px]" : "text-[24px]"
              } font-semibold px-5 !text-start`}
            >
              Users Analytics
            </h1>
            {isDashboard && (
              <p className={`${styles.label} text-lg px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-[60vh]"
            } flex items-center justify-center p-4`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
