import Link from "next/link";

import Image from "next/image";
import grayLogo from "/public/images/svgs/LogoGray.svg";
import googlePlay from "/public/images/svgs/Google Play.svg";
import appStore from "/public/images/svgs/App Store.svg";
import facebook from "/public/images/svgs/Facebook.svg";
import X from "/public/images/svgs/X.svg";
import insta from "/public/images/svgs/Insta.svg";
import youtube from "/public/images/svgs/Youtube.svg";
const Footer = () => {
  return (
    <footer
      className="w-full h-full flex flex-col 
    text-base text-white font-normal dark:text-light dark:border-light sm:text-base"
    >
      <div className="footer-border-radius py-12 flex items-start justify-between lg:flex-col lg:items-center lg:justify-center lg:py-6 bg-primary px-60">
        <div className="w-1/2 h-full flex flex-col items-start justify-between lg:mb-8 pe-5">
          <Image src={grayLogo} width={180} height={54} alt="" />
          <p className="text-white font-light text-base mt-12">
            An investment project by Palm Oases Agricultural Investment designed
            for all types of investors.
            <br />
            starting as low as 8000 EGP.
            <br />
            We offer a pioneering solution that is competitive to other
            conventional models with a very flexible, stable, and rewarding
            options for everyone.
          </p>
        </div>

        <div className="w-1/2 h-full flex flex-col items-center justify-start font-thin">
          <p className="text-xl">
            Join our mailing list and get the latest ideas and news from{" "}
            <span className="text-lightGreen">Sahm Nakheel</span>
          </p>
          <div className="w-full flex items-center justify-normal mt-8 ">
            <input
              id="text-input"
              type="text"
              className="border border-white rounded-full me-2   px-3 py-2 w-2/3 focus:outline-none focus:ring focus:border-blue-500 placeholder-gray-500 placeholder-opacity-90"
              placeholder="Name"
            />

            <div
              className={`w-auto flex items-center bg-dark text-light p-1.5 px-10  
                  rounded-full text-xl font-normal hover:bg-light hover:text-dark
                  border-2 border-solid border-transparent hover:border-dark
                  dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                  hover:dark:border-light md:p-2 md:px-4 md:text-base
                  `}
              style={{ cursor: "pointer" }}
            >
              Join
            </div>
          </div>
          <h1 className="w-full  mt-8 text-lg text-left">
            Download our app <span className="text-lightGreen">Now!</span>
          </h1>

          <div className="w-full flex items-center justify-start mt-2 ">
            <Image
              src={appStore}
              width={150}
              height={44}
              alt=""
              className="me-3"
            />
            <Image
              src={googlePlay}
              width={150}
              height={44}
              alt=""
              className="me-3"
            />
          </div>
        </div>

        {/* <span>{new Date().getFullYear()} &copy; All Rights reserved.</span> */}
      </div>

      <div className="w-full h-24 bg-primary flex flex-col items-center justify-between sm:flex-col sm:justify-center sm:items-center px-60">
        <div className="w-full border-t left-0 bottom-[2%] border-gray-500 flex "></div>
        <div className="w-full flex">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between text-xs">
              <p style={{ cursor: "pointer" }}>Terms of Use</p>
              <p style={{ cursor: "pointer" }}>Privacy Policy</p>
              <p style={{ cursor: "pointer" }}>Accessibility statement</p>
              <p style={{ cursor: "pointer" }}>Legal Information</p>
              <p style={{ cursor: "pointer" }}>Cookie Policy</p>
            </div>
            <span className="w-full text-xs text-gray-500 mt-2">
              {new Date().getFullYear()} &copy; Sahm Nakheel, All Rights
              reserved.
            </span>
          </div>
          <div className="w-full flex flex-col items-end justify-center">
            <div className="w-1/2 flex opacity-30 items-center justify-between mx-9">
              <Image src={facebook} width={44} height={44} alt="" />
              <Image src={X} width={44} height={44} alt="" />
              <Image src={insta} width={44} height={44} alt="" />
              <Image src={youtube} width={44} height={44} alt="" />
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
