import Image from "next/image";
import playIcon from "../../public/images/svgs/PlayIcon.svg";
import profilePic from "../../public/images/svgs/image_page_1.svg";
import polygon1 from "../../public/images/svgs/Polygon 1.svg";

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full lg:flex-col relative">
        <div className="absolute left-[12%] top-[-40%] translate-x-[-30%] sm:top-0 z-0 sm:hidden">
          <Image src={polygon1} alt="" className="w-full h-auto" />
        </div>
        <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center z-10 ">
          <h1
            className="w-full !text-md !text-left !text-primary font-light 
                xl:!text-2xl lg:!text-center lg:!text-3xl md:!text-3xl sm:!text-3xl"
          >
            Start your investment journey with Sahm Nakheel
          </h1>

          <br />
          <h1
            className="w-full !text-5xl !text-left !text-primary font-light
                xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-3xl sm:!text-3xl
                "
          >
            Affordable investment
          </h1>

          <div className="w-full flex items-center justify-center">
            <h1
              style={{
                fontFamily: "poppins",
                fontWeight: "800",
                fontSize: "40px",
              }}
              className="w-full !text-mlg !text-left !text-primary font-extrabold 
                xl:!text-5xl lg:!text-center lg:me-2 lg:!text-3xl md:!text-3xl sm:!text-3xl xs:!text-2xl 
                "
            >
              Starting from{" "}
              <span
                className="w-full !text-5xl !text-left !text-darkGreen font-extrabold 
                xl:!text-5xl lg:!text-center lg:!text-3xl md:!text-3xl sm:!text-3xl xs:!text-2xl
                "
              >
                8000 EGP
              </span>
            </h1>
          </div>
          <h1
            className="w-full !text-md !text-left !text-primary font-light
                xl:!text-2xl lg:!text-center lg:!text-3xl md:!text-3xl sm:!text-3xl
                "
          >
            Achieve an exceptional long-term ROI up to 50%
          </h1>

          <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
            <br />
          </p>
          <div className="flex items-center self-start mt-2 lg:self-center">
            <div
              className={`flex items-center bg-dark text-light p-2.5 px-12
                  rounded-full text-lg font-semibold hover:bg-light hover:text-dark
                  border-2 border-solid border-transparent hover:border-dark
                  dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                  hover:dark:border-light md:p-2 md:px-4 md:text-base
                  `}
              style={{ cursor: "pointer" }}
            >
              Get Started
            </div>
            <div
              className={`flex items-center bg-transparent text-dark p-2.5 pe-12 ps-5 mx-4
                  rounded-3xl text-lg font-normal hover:bg-darkGreen hover:text-light 
                  border border-solid border-darkGreen
                  dark:bg-dark dark:border-white dark:text-white  
                  md:p-2 md:px-4 md:text-base
                  `}
              style={{ cursor: "pointer" }}
            >
              <div className="w-full flex ">
                <Image
                  src={playIcon}
                  width={18}
                  height={21.5}
                  alt="play"
                  className="me-4 "
                />
                Watch Video
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        <div className="w-1/2 md:w-full">
          <Image
            priority={true}
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
            src={profilePic}
            alt="Sahm Nakheel"
            className="w-full h-auto lg:hidden md:inline-block md:w-full"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
