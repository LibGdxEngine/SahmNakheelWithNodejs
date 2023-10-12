import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navebar from "./Navbar";
import Notification from "../helpers/NotificationItem";
import NotificationsModal from "../helpers/NotificationsModal";
import Footer from "./Footer";

const Layout = ({ children, className = "" }) => {
  const [NotificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (loadingStatus === "loading") {
  } else if (loadingStatus === "succeeded") {
  } else if (loadingStatus === "failed") {
  } else {
  }

  const onOpenNotificationsClicked = (notifications) => {
    setNotifications(notifications);
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setNotificationModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setNotificationModalIsOpen(true);
  };

  return (
    <>
      <NotificationsModal
        isOpen={NotificationModalIsOpen}
        onClose={handleCloseModal}
      >
        <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
          {NotificationModalIsOpen && (
            <ul className="w-full">
              {notifications.reverse().map((notification) => {
                const date = new Date(notification.createdAt);
                const arabicDateString = date.toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  // second: "numeric",
                  hour12: true,
                  // timeZone: "UTC",
                });
                return (
                  <Notification
                    key={notification._id}
                    notificationId={notification._id}
                    title={`${notification.message}`}
                    date={`${arabicDateString}`}
                    link={`${notification.link}`}
                    read={`${notification.read}`}
                  />
                );
              })}
            </ul>
          )}
        </main>
      </NotificationsModal>
      <Navebar />
      <ToastContainer />
      <div
        className={`w-full  h-full inline-block z-0 bg-light p-40 dark:bg-dark xl:p-24 lg:p-16 md:p-12 sm:p-8 ${className}`}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
