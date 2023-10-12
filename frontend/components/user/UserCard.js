import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FavoriteIcon } from "../navbar/Icons";
const FramerImage = motion(Image);

function getElapsedTimeInArabic(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const duration = now - date;

  if (!isFinite(duration)) {
    throw new Error("Invalid date or duration.");
  }

  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const rtf = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });

  if (years >= 1) {
    return rtf.format(-years, "year");
  } else if (months >= 1) {
    return rtf.format(-months, "month");
  } else if (weeks >= 1) {
    return rtf.format(-weeks, "week");
  } else if (days >= 1) {
    return rtf.format(-days, "day");
  } else if (hours >= 1) {
    return rtf.format(-hours, "hour");
  } else if (minutes >= 1) {
    return rtf.format(-minutes, "minute");
  } else {
    return rtf.format(-seconds, "second");
  }
}

const UserCard = ({
  type,
  title,
  where,
  img,
  link,
  github,
  imageSize,
  isOnline = false,
  lastSeen,
}) => {
  const MotionLink = motion(Link);
  return (
    <article
      className="w-full h-auto  flex flex-col items-center justify-center rounded-2xl
      border border-solid !border-primary/50 p-6 relative dark:!bg-dark dark:border-light
      xs:p-4
      "
    >
      {isOnline ? (
        <>
          <p className="absolute top-1 left-2 w-full text-xs text-gray-500">
            متصل حاليا
          </p>
          <div
            className="absolute top-2 right-2 h-4 w-4 rounded-full bg-green-500"
            title="متصل حاليا"
          />
        </>
      ) : (
        <>
          <p className="absolute top-1 left-2 w-full text-xs text-gray-500">
            {lastSeen ? getElapsedTimeInArabic(lastSeen) : "منذ وقت طويل"}
          </p>

          <div
            className="absolute top-2 right-2 h-4 w-4 rounded-full bg-slate-200"
            title="غير متصل حاليا"
          />
        </>
      )}
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg flex flex-col items-center justify-center "
      >
        <FramerImage
          src={img}
          width={600}
          height={600}
          alt={`${title}`}
          layout="responsive"
          className={`${imageSize}`}
          whileHover={{ scale: 1.05 }}
        />
      </Link>

      <div className="w-full h-64 flex flex-col items-center justify-between mt-4">
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2 hover:text-primary"
        >
          <h2 className="my-2 w-full text-center text-2xl font-bold lg:text-2xl">
            {title}
          </h2>
        </Link>
        <span className="!text-primary text-center font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base ">
          {type}
        </span>
        <span className="!text-primary text-center font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base ">
          {where}
        </span>
        {/* <p className="my-2 font-medium text-dark">{summary}</p> */}
        <div className="w-full mt-2 flex items-center justify-center">
          {/* <div className="flex items-center self-center mt-2 lg:self-center">
            <MotionLink
              href={"/users"}
              target={"_blank"}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -2 }}
              className={`flex items-center !bg-primary  text-light p-2.5 px-6
                  rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
                  border-2 border-solid border-transparent hover:border-dark
                  dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                  hover:dark:border-light md:p-2 md:px-4 md:text-base
                  `}
            >
              التفاصيل
            </MotionLink>
          </div> */}
          {/* <Link href={github} target="_blank" className="w-8 md:w-6">
            <FavoriteIcon />
          </Link> */}
        </div>
      </div>
    </article>
  );
};

export default UserCard;
