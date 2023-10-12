import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FavoriteIcon } from "../navbar/Icons";
const FramerImage = motion(Image);

const FaqItem = ({ type, title, where, img, link, github, imageSize }) => {
  const MotionLink = motion(Link);
  return (
    <article
      className="w-full h-auto  flex flex-col items-center justify-center rounded-2xl
      border border-solid !border-primary/50 p-6 relative dark:!bg-dark dark:border-light
      xs:p-4
      "
    >
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


export default FaqItem;
