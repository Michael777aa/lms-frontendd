import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useGetAllOrdersQuery } from "@/app/redux/features/orders/ordersApi";
import { useGetAllCoursesQuery } from "@/app/redux/features/courses/coursesApi";
import { useGetAllUsersQuery } from "@/app/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices: React.FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user.id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );

        return {
          ...item,
          userName: user?.name || "Unknown",
          userEmail: user?.email || "Unknown",
          title: course?.name || "Unknown Course",
          price: course?.price ? `$${course.price}` : "N/A",
        };
      });

      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    {
      field: "userName",
      headerName: "Name",
      flex: isDashboard ? 0.6 : 0.5,
    },
    {
      field: "userEmail",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Contact",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <a href={`mailto:${params.row.userEmail}`}>
            <AiOutlineMail className="dark:text-white text-black" size={20} />
          </a>
        );
      },
    },
  ];

  const rows: any[] = [
    {
      id: "1234556777651",
      userName: "Shahriar Sajeeb",
      userEmail: "programmershahriarsajeeb@gmail.com",
      title: "React JS Course",
      price: "$500",
      created_at: "2 days ago",
    },
    {
      id: "1234556777652",
      userName: "John Doe",
      userEmail: "johndoe@example.com",
      title: "Node.js Mastery",
      price: "$450",
      created_at: "3 days ago",
    },
    {
      id: "1234556777653",
      userName: "Jane Smith",
      userEmail: "janesmith@example.com",
      title: "Full-Stack Development",
      price: "$600",
      created_at: "5 days ago",
    },
    {
      id: "1234556777654",
      userName: "Emily Johnson",
      userEmail: "emilyjohnson@example.com",
      title: "JavaScript Advanced",
      price: "$550",
      created_at: "1 week ago",
    },
    {
      id: "1234556777655",
      userName: "Michael Brown",
      userEmail: "michaelbrown@example.com",
      title: "Python for Beginners",
      price: "$400",
      created_at: "4 days ago",
    },
    {
      id: "1234556777656",
      userName: "Chris Wilson",
      userEmail: "chriswilson@example.com",
      title: "Vue.js Crash Course",
      price: "$480",
      created_at: "6 days ago",
    },
    {
      id: "1234556777657",
      userName: "Sarah Taylor",
      userEmail: "sarahtaylor@example.com",
      title: "Django Web Development",
      price: "$520",
      created_at: "2 weeks ago",
    },
    {
      id: "1234556777658",
      userName: "David Martinez",
      userEmail: "davidmartinez@example.com",
      title: "TypeScript Essentials",
      price: "$490",
      created_at: "5 days ago",
    },
  ];

  if (orderData) {
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt), // Ensure 'format' function is imported
      });
    });
  }

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none !important",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#34396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
              //   components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
