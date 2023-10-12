import React, { useState } from "react";
import OfferCardItem from "./OfferCardItem";
import Image from "next/image";
import nextPrevImage from "../../public/images/svgs/nextprevbtn.svg";
import SpecialOfferCard from "./SpecialOfferCard";

const Slider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pb-10 overflow-hidden">
      <div className="w-full flex items-center justify-between relative ">
        <div className="w-full">
          <div
            className="w-full flex"
            style={{
              transform: `translateX(-${currentIndex * (100 / cards.length)}%)`,
              width: `${100}%`,
              // display: "flex flex-row",
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="slide mx-3 py-10"
                style={{ flex: `0 0 ${100 / 3.3}%` }}
              >
                {card.isSpecial ? (
                  <SpecialOfferCard
                    years={card.years}
                    title={card.title}
                    investment={card.investment}
                    cost={card.cost}
                    rows={card.rows}
                    income={card.income}
                  />
                ) : (
                  <OfferCardItem
                    years={card.years}
                    title={card.title}
                    investment={card.investment}
                    cost={card.cost}
                    rows={card.rows}
                    income={card.income}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-10">
        <Image
          onClick={prevSlide}
          src={nextPrevImage}
          width={35}
          height={35}
          alt=""
          style={{ transform: "rotate(180deg)", cursor: " pointer" }}
        />
        <div className="indicators  border border-midGreen rounded-full p-1">
          {cards.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
            ></span>
          ))}
        </div>
        <Image
          onClick={nextSlide}
          src={nextPrevImage}
          width={35}
          height={35}
          alt=""
          style={{ cursor: " pointer" }}
        />
      </div>
    </div>
  );
};

export default Slider;
