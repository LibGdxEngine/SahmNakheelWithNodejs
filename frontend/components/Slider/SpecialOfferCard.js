import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import FeatureRow from "../FeatureRow";
const SpecialOfferCard = ({ years, title, investment, cost, rows, income }) => {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  const handleHover = () => {
    setHovered(true);
    controls.start({ scale: 1.05 }); // Scale up when hovered
  };

  const handleHoverEnd = () => {
    setHovered(false);
    controls.start({ scale: 1 }); // Reset scale when not hovered
  };
  return (
    <>
      <motion.div
        className="w-full flex flex-col items-start justify-between h-96 bg-white sm:mx-0 rounded-3xl  p-8 shadow-lg shadow-y-50
          bg-gradient-to-bl from-dark  to-greenCard
          relative
          "
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        animate={controls}
      >
        <div className="w-2/3 absolute left-[17%] top-[-5%] bg-mOrange rounded-full text-center p-3">
          <p className="text-dark font-bold text-xs">Most popular plan</p>
        </div>
        <div className="flex items-center justify-center text-white">
          <h1 className="text-6xl font-extrabold me-5">{years}</h1>
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-2xl text-lightGreen">{title}</h1>
            <h1 className="text-xs text-lightGreen">{investment}</h1>
            <h1 className="text-sm text-white font-extrabold">{cost}</h1>
          </div>
        </div>

        <div>
          <FeatureRow classes="!text-white" text={`${rows[0]}`} />
          <FeatureRow classes="!text-white" text={`${rows[1]}`} />
          <FeatureRow classes="!text-white" text={`${rows[2]}`} />
          <FeatureRow classes="!text-white" text={`${rows[3]}`} />
          <FeatureRow classes="!text-white" text={`${rows[4]}`} />
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-extrabold me-1">
              {income}
            </h1>
            <h1 className="text-sm text-white font-bold mt-1">EGP</h1>
          </div>

          <div
            className={` shadow-lg shadow-y-20 flex items-center bg-gradient-to-br from-lightGreen to-lightGray  p-1.5 px-4
              rounded-3xl text-xs font-bold hover:bg-light 
              text-darkGreen
              dark:bg-light dark:text-white  
               md:p-2 md:px-4 md:text-base
              `}
            style={{ cursor: "pointer" }}
          >
            Choose Plan
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SpecialOfferCard;