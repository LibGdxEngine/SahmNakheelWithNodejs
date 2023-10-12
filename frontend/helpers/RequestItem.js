import { motion } from "framer-motion";
import Link from "next/link";

const RequestItem = ({ title, date, requestStatus, link }) => {
  return (
    <a
      className="w-full mx-8 px-8"
      href={`${link}`}
      target="_blank"
      onClick={() => {}}
    >
      <motion.li
        whileHover={{ y: -2 }}
        style={{ cursor: "pointer" }}
        className=" w-full  p-4 py-6 my-4 rounded-xl flex items-center 
       justify-between bg-white text-dark first:mt-0 border border-solid border-dark
       border-r-4 border-b-4 dark:border-white  dark:bg-dark dark:text-white 
       sm:flex-col
       "
      >
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-semibold hover:underline">{title}</h2>
          <h4 className="text-md font-semibold hover:underline !text-rose-600">
            {requestStatus}
          </h4>
        </div>

        <span className="text-primary font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm">
          {date}
        </span>
      </motion.li>
    </a>
  );
};

export default RequestItem;
