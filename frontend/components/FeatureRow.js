import Image from "next/image";
import bullet from "../public/images/svgs/Bullet.svg";
const FeatureRow = ({
  text,
  classes = "",
  imageWidth = 28,
  imageHeight = 18,
}) => {
  return (
    <>
      <div className={`w-full flex items-center justify-start ms-3 mb-3`}>
        <Image
          src={bullet}
          width={imageWidth}
          height={imageHeight}
          alt=""
          className="me-3"
        />
        <p className={`text-navyBlue text-xs font-semibold  ${classes}`}>
          {text}
        </p>
      </div>
    </>
  );
};

export default FeatureRow;
