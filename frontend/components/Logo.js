import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import logoImage from "../public/images/svgs/Logo.svg";
import { LogoComponent } from "./Icons";
const MotionLink = motion(Image);
const Logo = () => {
  return (
    <div className="flex items-center justify-center mt-2">
      <LogoComponent />
    </div>
  );
};

export default Logo;
