import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import icon from "/public/images/svgs/Icon Button.svg";
const ExpandableDiv = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleRotation = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleOpen = () => {
    toggleRotation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      <div
        className="w-full bg-lightGreen rounded-full px-12 py-3 relative"
        onClick={toggleOpen}
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center justify-between">
          <p className="text-white text-sm font-semibold sm:text-sm">{title}</p>
        </div>
        <Image
          src={icon}
          width={35}
          height={35}
          alt=""
          style={{ cursor: "pointer" }}
          className={`absolute right-[1%] h-full flex flex-col items-center justify-center  top-[0%] transform transition-transform  
            ${
            isExpanded ? "rotate-180" : ""
          }
          
          `}
          onClick={toggleOpen}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-full h-auto text-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableDiv;
