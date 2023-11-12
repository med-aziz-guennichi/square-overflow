"use client";
import Lottie from "lottie-react";
import preNotification from "@/animations/pre.json";
import notifNotification from "@/animations/not.json";
import { useEffect, useState } from "react";
import { getNotifications, updateNotification } from "@/lib/actions/notification.action";
import { useRouter, usePathname } from "next/navigation"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar";
import { getTimestamp } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
  

const Notification = ({user}:any) => {
  if (!user) {
    return null;
  }

  const router = useRouter();
  const pathname = usePathname();
  const userParsed = JSON.parse(user);

  const [notifications, setNotifications] = useState<undefined | any>([]);
  const [notificationPending, setNotificationPending] = useState<undefined | any>([]);
  const [notifClicked, setNotifClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getAllNotification();
    };
    fetchData();
  }, [userParsed._id, notifClicked]);

  const getAllNotification = async () => {
    const res = await getNotifications(userParsed._id);
    if (!res) {
      return;
    }
    setNotifications(res);
    const pending = res.filter((item: any) => item.status === "unshow");
    setNotificationPending(pending);
  };
  return (
    <>
      <Menubar className="relative border-none bg-transparent shadow-none ">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 w-16 cursor-pointer">
        {notificationPending.length > 0 ? (
        <Lottie loop={true} animationData={notifNotification} />
      ) : (
        <Lottie loop={false} animationData={preNotification} />
      )}
        </MenubarTrigger>
        <MenubarContent className=" right-[-3rem] mt-2 mr-32 rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300">
          {notifications.length > 0 ? notifications.map((notif:any) => (
            <MenubarItem
              key={notif.value}
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400 cursor-pointer"
              onClick={async() => {
                setNotifClicked(true);
                await updateNotification(notif._id,pathname);
                router.push(notif.link);
              }}
            >
              <p
                className={`body-semibold ${notif.status === "show" ? "text-light-700" : "text-light-500"}`}
              >
                {notif.content} <Badge>{getTimestamp(notif.createdAt)}</Badge>
              </p>
            </MenubarItem>
          ) ): (
            <p
            className={`body-semibold text-light-800`}
          >
            No notification yet
          </p>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    </>
  )
}

export default Notification