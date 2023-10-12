import Image from "next/image";
import walletImage1 from "../../public/images/svgs/Wallet Icon (1).svg";
import walletImage2 from "../../public/images/svgs/Wallet Icon (2).svg";
import walletImage3 from "../../public/images/svgs/Wallet Icon (3).svg";
import walletImage4 from "../../public/images/svgs/Wallet Icon (4).svg";
import walletImage5 from "../../public/images/svgs/Wallet Icon (5).svg";
import walletImage6 from "../../public/images/svgs/Wallet Icon (6).svg";
import walletImage7 from "../../public/images/svgs/Wallet Icon (7).svg";
import walletImage from "../../public/images/svgs/Wallet Icon.svg";
import polygon3 from "../../public/images/svgs/Polygon 3.svg";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import greatFeatures from "../../public/images/svgs/Great Features.svg";

const CardItem = ({ image, title, desc }) => {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  const handleHover = () => {
    setHovered(true);
    controls.start({ scale: 1.1, rotate: -5 }); // Scale up when hovered
  };

  const handleHoverEnd = () => {
    setHovered(false);
    controls.start({ scale: 1, rotate: 0 }); // Reset scale when not hovered
  };

  return (
    <>
      <div
        className="flex flex-col items-start bg-white bg-opacity-50 justify-between h-72  rounded-3xl mx-8 p-8 sm:items-center md:bg-gray-200"
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
      >
        <motion.div animate={controls} className="">
          <Image src={image} height={76} width={73} alt="wallet" />
        </motion.div>

        <h1 className="text-lg font-extrabold text-primary">{title}</h1>
        <p className="text-sm text-dark font-thin">{desc}</p>
      </div>
    </>
  );
};

const Features = ({ aboutUsElementRef }) => {
  return (
    <div>
      <div
        id="features"
        className="w-full flex flex-col items-center justify-center mt-24 relative"
      >
        <div className="absolute left-[50%] top-[18%] translate-x-[-53%] sm:top-0 z-100 sm:hidden">
          <Image src={greatFeatures} alt="" className="w-full h-auto" />
        </div>
        <h1 className="text-7xl text-primary font-normal text-center">
          Great Features
        </h1>
        <br />
        <h1 className="text-2xl text-primary font-thin w-1/2 text-center">
          There is no better asset to own than one that increases in value over
          time & keeps pace with inflation
        </h1>
      </div>
      <br />

      <div className="grid grid-cols-4 gap-y-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-8 md:gap-y-16">
        <CardItem
          image={walletImage}
          title={`Affordable`}
          desc={`As low as just 800 EGP per month/share, Sahm Nakheel offers an accessible investment.`}
        />
        <CardItem
          image={walletImage1}
          title={`Exceptional`}
          desc={`Your financial stake in Sahm Nakheel opens the doors to exceptional returns.`}
        />
        <CardItem
          image={walletImage2}
          title={`Long-Term`}
          desc={`The 50-year ownership period provides stability and a long-term commitment.`}
        />
        <CardItem
          image={walletImage3}
          title={`Guaranteed`}
          desc={`Medjool dates are becoming a world-famous export product with an exceptional demand.`}
        />

        <CardItem
          image={walletImage4}
          title={`Effortless`}
          desc={`Our tailor-made plans allow you to buy the number of shares that best suits your needs.`}
        />
        <CardItem
          image={walletImage5}
          title={`Flexible`}
          desc={`Investment options allow you to tailor your initial investment to what you are comfortable with.`}
        />
        <CardItem
          image={walletImage6}
          title={`Easy`}
          desc={`Invest from anywhere through our user-friendly website, with just a few clicks.`}
        />
        <CardItem
          image={walletImage7}
          title={`Safe`}
          desc={`Ensure peace of mind and a risk-free venture with our top-notch risk practices.`}
        />
      </div>
    </div>
  );
};

export default Features;
