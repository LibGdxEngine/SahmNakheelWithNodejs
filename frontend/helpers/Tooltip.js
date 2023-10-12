import React from "react";

const CustomTooltip = ({ text }) => {
  return (
    <div
      style={{
        width: "600px",
        height: "100px",
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translate(-50%, 0)",
        padding: "5px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {text}
    </div>
  );
};

export default CustomTooltip;
