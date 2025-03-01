import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetOrderAnalyticsQuery } from "@/app/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: Props) {
  const { data, isLoading } = useGetOrderAnalyticsQuery({});

  // Initialize analytics data
  const analyticsData: any[] = [];

  // Ensure data exists and structure the analyticsData array properly
  if (data && data.orders?.last12Months) {
    data.orders.last12Months.forEach((item: any) => {
      // Make sure the name and count are properly mapped
      analyticsData.push({ name: item.name, count: item.count });
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`w-full ${
            isDashboard ? "h-[30vh]" : "h-screen"
          } flex items-center justify-center`}
        >
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
          >
            <h1
              className={`px-5 !text-start ${styles.title} ${
                isDashboard && "!text-[20px]"
              }`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                data={analyticsData} // Pass analytics data
                margin={{ top: 5, right: 36, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line
                  type="monotone"
                  dataKey="count" // Ensure this matches the data
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
