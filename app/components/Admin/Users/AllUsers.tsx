"use client";

import { Box, Button } from "@mui/material";
import { useTheme } from "next-themes";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllUsersQuery } from "@/app/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },

    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
            sx={{
              "&:hover": { backgroundColor: "#d32f2f" },
              padding: "6px 12px",
              borderRadius: "8px",
            }}
          >
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <a
            href={`mailto:${params.row.email}`}
            style={{ textDecoration: "none" }}
          >
            <AiOutlineMail
              className="dark:text-white text-black mt-[16px]"
              size={20}
              style={{
                transition: "color 0.3s",
              }}
            />
          </a>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.created_at),
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={"20px"}>
          <Box
            m="40px 70px 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .MuiSvgIcon-root.MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#394396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#394396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
            }}
          >
            <div className="w-full flex justify-end mb-3 ">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: theme === "dark" ? "#57c7a3" : "#3f51b5",
                  "&:hover": {
                    backgroundColor: theme === "dark" ? "#45a687" : "#303f9f",
                  },
                  padding: "8px 16px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textTransform: "capitalize",
                }}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </Button>
            </div>
            <DataGrid checkboxSelection columns={columns} rows={rows} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
