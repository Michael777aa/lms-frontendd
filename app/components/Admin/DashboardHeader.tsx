import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/app/redux/features/notifications/notificationApi";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { FC, useEffect, useState } from "react";
import { MdNotificationsNone } from "react-icons/md"; // Corrected icon import
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationstatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(
    new Audio("https://www.fesliyanstudios.com/play-mp3/4385")
  );
  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data: any) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatus = async (id: string) => {
    await updateNotificationstatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-4 fixed top-4 right-4 bg-transparent z-50">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300 ease-in-out"
        onClick={() => setOpen(!open)}
      >
        <MdNotificationsNone className="text-3xl dark:text-white text-black" />
        {notifications.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#3ccba0] rounded-full w-[18px] h-[18px] text-[10px] flex items-center justify-center text-white font-semibold shadow-md">
            {notifications.length}
          </span>
        )}
      </div>

      {open && (
        <div className="w-[380px] h-auto max-h-[60vh] dark:bg-[#111C43] bg-white shadow-2xl absolute top-14 right-2 z-50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <h5 className="text-center text-lg font-semibold font-Poppins text-black dark:text-white p-4 border-b border-gray-300 dark:border-gray-700">
            Notifications
          </h5>

          <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((item: any) => (
                <div
                  key={item._id}
                  className="dark:bg-[#2d3a4e] bg-[#f9f9f9] font-Poppins border-b dark:border-b-[#ffffff47] p-4 hover:bg-gray-100 dark:hover:bg-[#3b4b6b] transition duration-300"
                >
                  <div className="w-full flex items-center justify-between">
                    <p className="text-black dark:text-white font-medium">
                      {item.title}
                    </p>
                    <button
                      className="text-sm text-[#3ccba0] hover:underline"
                      onClick={() => handleNotificationStatus(item._id)}
                    >
                      Mark as read
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {item.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {format(item.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 p-6">
                No new notifications
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
