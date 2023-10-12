import { addScaleCorrector, motion } from "framer-motion";
import Link from "next/link";
import { API } from "../config";
import { readMyNotifications } from "../actions/user";
import { getCookie } from "../actions/auth";

const handleReadNotification = async (notificationId, token) => {
  const response = await readMyNotifications(notificationId, token);
};

const Notification = ({ notificationId, title, date, link, read }) => {
  const token = getCookie("token");

  return (
    <div key={notificationId}>
      <Link
        // key={Math.random()}
        href={`${link}`}
        target="_blank"
        onClick={() => {
          handleReadNotification(notificationId, token);
        }}
      >
        <motion.li
          whileHover={{ y: -2 }}
          style={{ cursor: "pointer" }}
          className="relative w-full  p-4 py-6 my-4 rounded-xl flex items-center 
         justify-between bg-light text-dark first:mt-0 border border-solid border-dark
         border-r-4 border-b-4 dark:border-light  dark:bg-dark dark:text-light 
         sm:flex-col
         "
        >
          <div className="flex flex-row">
            {read === "true" ? (
              <div
                style={{ backgroundColor: "green" }}
                className="w-3 h-3 rounded-full mx-3"
              >
                .
              </div>
            ) : (
              <div
                style={{ backgroundColor: "red" }}
                className="w-3 h-3 rounded-full mx-3"
              >
                .
              </div>
            )}
            <h2 className="text-lg font-semibold hover:underline sm:text-sm">
              {title}
            </h2>
          </div>

          <span className="text-primary font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm">
            {date}
          </span>
        </motion.li>
      </Link>
    </div>
  );
};

export default Notification;
