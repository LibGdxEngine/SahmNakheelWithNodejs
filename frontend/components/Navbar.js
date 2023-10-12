import Link from "next/link";
import Logo from "../components/Logo";
import { useRouter } from "next/router";
import langImage from "/public/images/svgs/languageIcon.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const CustomLink = ({ onClick, title, className = "" }) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      style={{ cursor: "pointer" }}
      className={`${className} relative group text-darkGreen text-base font-medium  dark:text-white inline-block`}
    >
      {title}
      &nbsp;
    </div>
  );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();
  const handleClick = () => {
    toggle();
    // router.push(href);
  };
  return (
    <button
      onClick={handleClick}
      href={href}
      className={`${className} relative group text-light dark:text-dark my-2`}
    >
      {title}

      <span
        className={`h-[1px] inline-block bg-light absolute left-0
       -bottom-0.5
       group-hover:w-full transition-[width] ease duration-300
       ${router.asPath === href ? "w-full" : "w-0"}
       dark:bg-dark 
       `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const Navebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleScrollToTarget = (elementId) => {
    // Scroll to the target item
    props.scrollToTarget(elementId);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className="w-full px-40 py-8 font-medium flex items-center justify-between
    dark:text-light lg:px-16 md:px-12 sm:px-8 z-10 bg-transparent
    "
    >
      <button
        className="flex-col justify-center items-center hidden xl:flex"
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm -translate-y-0.5 ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm -translate-y-0.5 ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      <div className="w-full flex flex-col items-center justify-between xl:hidden mt-10">
        <Logo />
        <div className="w-full flex items-center justify-between h-24 ">
          <nav className="w-[75%] flex items-center justify-between ">
            <CustomLink title={"Home"} />
            <CustomLink
              onClick={() => {
                handleScrollToTarget("aboutus");
              }}
              title={"About Us"}
              className="mx-4"
            />
            <CustomLink
              onClick={() => {
                handleScrollToTarget("features");
              }}
              title={"Features"}
              className="mx-4"
            />
            <CustomLink
              onClick={() => {
                handleScrollToTarget("pricing");
              }}
              title={"Pricing"}
              className="mx-4"
            />
            <CustomLink
              onClick={() => {
                handleScrollToTarget("faq");
              }}
              title={"FAQs"}
              className="mx-4"
            />
            <CustomLink title={"Gallery"} className="mx-4" />
            <CustomLink title={"Blog"} className="mx-4" />
            <CustomLink
              onClick={() => {
                handleScrollToTarget("contactus");
              }}
              title={"Contact Us"}
              className="mx-4"
            />
          </nav>
          <nav className="flex items-center justify-center flex-wrap">
            <div
              className={` shadow-lg shadow-y-20 flex items-center bg-gradient-to-br from-lightGreen to-darkGreen text-light py-1 px-4
            rounded-3xl text-base font-bold hover:bg-light 
            
            dark:bg-light dark:text-white  
             md:p-2 md:px-4 md:text-base
            `}
              style={{ cursor: "pointer" }}
            >
              Get App
            </div>

            <div
              className={`flex items-center bg-transparent text-dark py-1 px-4 mx-2
            rounded-3xl text-base font-normal hover:bg-darkGreen hover:text-white 
            border border-solid border-darkGreen
            dark:bg-dark dark:border-white dark:text-white  
             md:p-2 md:px-4 md:text-base
            `}
              style={{ cursor: "pointer" }}
            >
              Sign in
            </div>

            <div
              className="flex rounded-full  dark:border-white bg-transparent p-2 "
              style={{ cursor: "pointer" }}
            >
              <Image src={langImage} height={9} width={9} alt="lang" />

              <div className="text-xs mx-1 text-darkGreen dark:text-white">
                EN
              </div>
            </div>
          </nav>
        </div>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col items-center z-30 justify-between fixed top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2 backdrop-blur-md py-32 bg-dark/90 dark:bg-light/75 rounded-lg
        "
        >
          <nav className="flex items-center flex-col justify-center">
            <CustomMobileLink href={`/`} title={"Home"} toggle={handleClick} />
            <CustomMobileLink
              href={`/about`}
              title={"About Us"}
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/projects`}
              title={"Features"}
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/articles`}
              title={"Pricing"}
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/articles`}
              title={"FAQs"}
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/articles`}
              title={"Gallery"}
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/articles`}
              title={"Blog"}
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/articles`}
              title={"Contact Us"}
              toggle={handleClick}
            />
          </nav>

          {/* <nav className="flex items-center justify-center flex-wrap mt-2">
            <motion.a
              href={`https://twitter.com`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3 sm:mx-1"
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href={`https://twitter.com`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href={`https://twitter.com`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <LinkedInIcon />
            </motion.a>
            <motion.a
              href={`https://twitter.com`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <PinterestIcon />
            </motion.a>
            <motion.a
              href={`https://twitter.com`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 ml-3 sm:mx-1"
            >
              <DribbbleIcon />
            </motion.a>

            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`ml-3 flex items-center justify-center rounded-full p-1 ${
                mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
              }`}
            >
              {mode === "dark" ? (
                <SunIcon className={`fill-dark`} />
              ) : (
                <MoonIcon className={`fill-dark`} />
              )}
            </button>
          </nav> */}
        </motion.div>
      ) : null}
      {/* <div className="absolute left-[50%] top-2 translate-x-[-50%] sm:top-0">
        <Logo />
      </div> */}
    </header>
  );
};

export default Navebar;
