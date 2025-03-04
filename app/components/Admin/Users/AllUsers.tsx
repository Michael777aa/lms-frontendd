"use client";

import { Box, Button } from "@mui/material";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/app/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import { Modal, Typography } from "@mui/material";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [updateUser, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }

    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
      setOpen(false);
    }
  }, [updateError, isSuccess, deleteSuccess]);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },

    {
      field: " ",
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
      field: "  ",
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
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

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
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  className={`${styles.title}`}
                >
                  Are you sure you want to delete this user?
                </Typography>

                <div className="flex w-full items-center justify-between mt-6">
                  {/* Cancel Button */}
                  <Button
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3] text-white`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>

                  {/* Delete Button */}
                  <Button
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f] text-white`}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
