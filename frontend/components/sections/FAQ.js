import Image from "next/image";
import faq from "../../public/images/svgs/Frequently asked questions.svg";
import ExpandableDiv from "../ExpandableDiv";

const FAQs = () => {
  return (
    <>
      <br />
      <br />
      <div
        id="faq"
        className="w-full  flex flex-col items-center justify-center mt-16 relative"
      >
        <div className="absolute left-[-3%] top-[0%] translate-x-[-0%] sm:top-0 z-100 sm:hidden">
          <Image src={faq} alt="" className="w-full h-auto" />
        </div>
        <h1 className="text-7xl  text-primary font-normal sm:text-center">
          Frequently asked questions
        </h1>
        <br />
        <h1 className="text-2xl text-primary font-thin w-full text-center sm:text-center">
          We can answer your questions any time
        </h1>
        <div className="w-full mt-20 grid grid-cols-2 gap-y-8 gap-x-6 lg:gap-2 md:grid-cols-1 md:gap-y-16 sm:gap-y-4">
          <ExpandableDiv
            title={"What are the benefits of investing with Sahm Nakheel?"}
            content={
              <div className="flex mt-4">
                <div class="border-l-2 border-mildGray h-auto me-4"></div>
                <h1 className="text-primary px-3">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </h1>
              </div>
            }
          />
          <ExpandableDiv
            title={"What makes Nakheel Al Majdool so special?"}
            content={
              <div className="flex mt-4">
                <div class="border-l-2 border-mildGray h-auto me-4"></div>
                <h1 className="text-primary px-3">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </h1>
              </div>
            }
          />
          <ExpandableDiv
            title={"How does the contracting process work?"}
            content={
              <div className="flex mt-4">
                <div class="border-l-2 border-mildGray h-auto me-4"></div>
                <h1 className="text-primary px-3">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </h1>
              </div>
            }
          />
          <ExpandableDiv
            title={"What is the location of Sahm Nakheel project?"}
            content={
              <div className="flex mt-4">
                <div class="border-l-2 border-mildGray h-auto me-4"></div>
                <h1 className="text-primary px-3">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </h1>
              </div>
            }
          />
          <ExpandableDiv
            title={"What are the benefits of investing with Sahm Nakheel?"}
            content={
              <div className="flex mt-4">
                <div class="border-l-2 border-mildGray h-auto me-4"></div>
                <h1 className="text-primary px-3">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </h1>
              </div>
            }
          />
          <ExpandableDiv
            title={"What guarantees are provided by the project?"}
            content={
              <div className="flex mt-4">
                <div class="border-l-2 border-mildGray h-auto me-4"></div>
                <h1 className="text-primary px-3">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </h1>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default FAQs;
