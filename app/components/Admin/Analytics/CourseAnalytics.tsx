import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/app/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {};

const CourseAnalytics: React.FC<Props> = (props) => {
  const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});

  //   const analyticsData: any = [
  //     { name: "dsafsad", uv: 5 },
  //     { name: "dsaf", uv: 5 },
  //     { name: "dklsafsadfjldsjk", uv: 3 },
  //     { name: "dsafdsafas", uv: 1 },
  //     { name: "dsafasdfsad", uv: 5 },
  //     { name: "dsfafdsa", uv: 7 },
  //     { name: "dklsafdsafsdafjldsjk", uv: 8 },
  //   ];

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  console.log("Fetched Data", analyticsData);

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`px-5 !text-start ${styles.title}`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data
            </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label value="Courses" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
