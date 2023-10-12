import Image from "next/image";
import aboutUs from "../../public/images/svgs/About Us.svg";
import profilePic2 from "../../public/images/svgs/page2.svg";

const AboutUs = ({ aboutUsElementRef }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-20 relative">
        <div
          id="aboutus"
          className="absolute left-[50%] top-[6%] translate-x-[-53%] sm:top-0 z-100 sm:hidden"
        >
          <Image src={aboutUs} alt="" className="w-full h-auto" />
        </div>
        <h1 className="text-7xl text-primary font-normal">About Us</h1>
        <br />
        <h1 className="text-2xl text-primary font-thin text-center">
          Maximizing your investment opportunities
        </h1>
      </div>

      <div className="flex items-center justify-between w-full lg:flex-col mt-16">
        <div className="w-1/2 md:w-full me-8">
          <Image
            priority={true}
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
            src={profilePic2}
            alt="Sahm Nakheel"
            className="w-full h-auto lg:hidden md:inline-block md:w-full"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center ">
          <h1
            ref={aboutUsElementRef}
            className="!text-5xl !text-left !text-primary font-normal
                xl:!text-xl lg:!text-center lg:!text-3xl md:!text-5xl sm:!text-3xl
                "
          >
            Take control of your financial destiny and build future
          </h1>
          <br />

          <p className="my-4 text-base font-medium md:text-sm sm:text-sm">
            With Sahm Nakheel, you can own a share, which represents a palm
            tree, for an impressive period of 50 years.
          </p>
          <p className="my-4 text-base font-medium md:text-sm sm:text-sm">
            And guess what? The value of one share is a mere 8000 Egyptian
            pounds! Such an affordable investment opens the door to incredible
            possibilities.
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
              Reserve your share now
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
