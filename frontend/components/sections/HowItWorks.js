import Image from "next/image";
import group2 from "../../public/images/svgs/Group 1 (1).svg";
import group3 from "../../public/images/svgs/Group 1 (2).svg";
import group4 from "../../public/images/svgs/Group 1 (3).svg";
import group1 from "../../public/images/svgs/Group 1.svg";
import howItWorks from "../../public/images/svgs/How It Works.svg";

const HowItWorks = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16 relative">
        <div className="absolute left-[50%] top-[10%] translate-x-[-53%] sm:top-0 z-100 sm:hidden">
          <Image src={howItWorks} alt="" className="w-full h-auto" />
        </div>
        <h1 className="text-7xl text-primary font-normal sm:text-center">
          How It Works
        </h1>
        <br />
        <h1 className="text-2xl text-primary font-thin w-1/2 text-center">
          With just a few clicks, you can create your own investment
        </h1>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-4 gap-x-40 gap-y-8 lg:gap-2 md:grid-cols-1 md:gap-y-16">
        <div className="w-full flex flex-col items-center justify-center ">
          <Image src={group1} width={129} height={192} alt="" />
          <h1 className="text-primary text-3xl font-bold mt-2">Register</h1>
          <h1 className="text-dark text-xl font-thin text-center p-2">
            Sign-Up easily through our website or application.
          </h1>
        </div>
        {/*  */}
        <div className="w-full flex flex-col items-center justify-center ">
          <Image src={group2} width={129} height={192} alt="" />
          <h1 className="text-primary text-3xl font-bold mt-2">Choose</h1>
          <h1 className="text-dark text-xl font-thin text-center p-2">
            Get your investment option from our wide range offers.
          </h1>
        </div>
        {/*  */}
        <div className="w-full flex flex-col items-center justify-center ">
          <Image src={group3} width={129} height={192} alt="" />
          <h1 className="text-primary text-3xl font-bold mt-2">Easy Pay</h1>
          <h1 className="text-dark text-xl font-thin text-center p-2">
            Flexible & convenient payments for everyone.
          </h1>
        </div>
        {/*  */}
        <div className="w-full flex flex-col items-center justify-center ">
          <Image src={group4} width={129} height={192} alt="" />
          <h1 className="text-primary text-3xl font-bold mt-2">Own</h1>
          <h1 className="text-dark text-xl font-thin text-center p-2">
            You will get notified within 24H of New Investment.
          </h1>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
