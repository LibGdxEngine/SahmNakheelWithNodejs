import Image from "next/image";
import bestROI from "../../public/images/svgs/Best ROI Lable.svg";
import DownloadAppTextHidden from "../../public/images/svgs/DownloadAppTextHidden.svg";
import longTerm from "../../public/images/svgs/Long Term Lable.svg";
import mobileImage from "../../public/images/svgs/Mobile.svg";
import secure from "../../public/images/svgs/Secure Lable.svg";
import downloadAppText from "../../public/images/svgs/downloadAppText.svg";
import FeatureRow from "../FeatureRow";

const DownloadApp = () => {
  return (
    <>
      <br />
      <br />
      <br />

 
      <div className="flex items-center justify-between w-full lg:flex-col">
        <div className="w-1/2 md:w-full relative">
          <Image
            priority={true}
            width={789}
            height={728}
            sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
            src={mobileImage}
            alt="Sahm Nakheel"
            className="w-full h-auto lg:hidden md:inline-block md:w-full"
          />
          <Image
            src={bestROI}
            width={226}
            height={104}
            alt=""
            className="absolute right-[14%] top-[64%] sm:hidden lg:hidden"
          />
          <Image
            src={longTerm}
            width={250}
            height={95}
            alt=""
            className="absolute left-[6%] top-[41.5%] sm:hidden lg:hidden"
          />
          <Image
            src={secure}
            width={191}
            height={101}
            alt=""
            className="absolute right-[35%] top-[-5%] sm:hidden lg:hidden"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center relative">
          <Image src={downloadAppText} width={496} height={205} alt="" />
          <Image
            src={DownloadAppTextHidden}
            width={708}
            height={268}
            alt=""
            className="absolute right-[4%] top-[-8%]"
          />
          <p className="my-4 text-base font-medium md:text-sm sm:text-xs"></p>
          <div className="flex flex-col items-center self-start mt-2 lg:self-center">
            <FeatureRow
              text={`Easy options to sign up and enjoy our Sahm Nakheel app`}
              classes="!text-lg !text-primary font-thin"
              imageWidth={47}
              imageHeight={33}
            />
            <br />
            <FeatureRow
              text={`The project's latest developments are notified to you through notifications`}
              classes="!text-lg !text-primary font-thin"
              imageWidth={47}
              imageHeight={33}
            />
            <br />
            <FeatureRow
              text={`Track your installments and view your account statement for the latest transactions`}
              classes="!text-lg !text-primary font-thin"
              imageWidth={47}
              imageHeight={33}
            />
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default DownloadApp;
