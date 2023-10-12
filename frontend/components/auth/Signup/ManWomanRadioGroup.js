import React, { useState } from "react";

export default function ManWomanRadioGroup({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <div dir="rtl" className="flex flex-col space-y-2 mb-4">
      <label className="font-bold mb-2">من أنت ؟</label>
      <div className="w-full flex flex-row items-center justify-around space-x-2">
        <label
          htmlFor="man"
          className={`${
            selectedOption === "man"
              ? "!bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } w-1/3 text-center text-xl px-4 py-2 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out
          border border-solid border-gray-200
          hover:border hover:border-solid hover:!border-black
          `}
        >
          <input
            type="radio"
            id="man"
            name="options"
            value="man"
            checked={selectedOption === "man"}
            onChange={handleOptionChange}
            className="hidden"
          />
          أنا رجل
        </label>
        <label
          htmlFor="woman"
          className={`${
            selectedOption === "woman"
              ? "!bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }  w-1/3 text-center text-xl px-4 py-2 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out
          border border-solid border-gray-200
          hover:border hover:border-solid hover:!border-black
          `}
        >
          <input
            type="radio"
            id="woman"
            name="options"
            value="woman"
            checked={selectedOption === "woman"}
            onChange={handleOptionChange}
            className="hidden"
          />
          أنا امرأة
        </label>
      </div>
    </div>
  );
}
