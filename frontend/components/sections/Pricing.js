import Image from "next/image";

import { useCallback, useEffect, useState } from "react";
import investmentPlan from "../../public/images/svgs/Investment Plans.svg";
import FeatureRow from "../FeatureRow";
import { initateCheckout } from "../../actions/user";
import OfferCardItem from "../Slider/OfferCardItem";
import SpecialOfferCard from "../Slider/SpecialOfferCard";
import Slider from "../Slider/Slider";

const startNewCheckOut = async (checkout) => {
  // const sessionData = await initateCheckout();
  // console.log(sessionData);
  // Checkout.configure({
  //   session: {
  //     id: sessionData.session.id,
  //   },
  // });
  // // checkout.showPaymentPage();
};

const cards = [
  {
    years: [10],
    title: "Medjool Trees",
    investment: "10 - Years ROI would be",
    cost: "EGP 250,000",
    rows: [
      "EGP 25000 Annual ROI",
      "Installment over 10 Months",
      "EGP 8000 installment per Month",
      "30% Average ROI",
      "EGP 70000 for Cash Payment",
    ],
    income: "EGP 80,000",
  },
  {
    years: [5],
    title: "Medjool Trees",
    investment: "10 - Years ROI would be",
    cost: "EGP 125,000",
    rows: [
      "EGP 12500 Annual ROI",
      "Installment over 10 Months",
      "EGP 4000 installment per Month",
      "30% Average ROI",
      "EGP 35000 for Cash Payment",
    ],
    income: "EGP 40,000",
  },
  {
    years: [1],
    title: "Medjool Trees",
    investment: "10 - Years ROI would be",
    cost: "EGP 125,000",
    rows: [
      "EGP 12500 Annual ROI",
      "Installment over 10 Months",
      "EGP 4000 installment per Month",
      "30% Average ROI",
      "EGP 7000 for Cash Payment",
    ],
    income: "EGP 8,000",
    isSpecial: true,
  },
  {
    years: [1],
    title: "Medjool Trees",
    investment: "10 - Years ROI would be",
    cost: "EGP 25,000",
    rows: [
      "EGP 2500 Annual ROI",
      "Installment over 10 Months",
      "EGP 4000 installment per Month",
      "30% Average ROI",
      "EGP 7000 for Cash Payment",
    ],
    income: "EGP 8,000",
  },
];

const Pricing = ({ checkout }) => {
  useEffect(() => {
    if (checkout) {
      startNewCheckOut(checkout);
    }
  }, [checkout]);

  return (
    <>
      <div
        id="pricing"
        className="w-full pt-8 bg-mintyGreen rounded-3xl px-14 mt-44 xs:p-3"
      >
        <div className="w-full flex flex-col items-center justify-center mt-12 relative">
          <div className="w-full absolute left-[58%] top-[-20%] translate-x-[-53%] sm:top-0 z-100 sm:hidden">
            <Image src={investmentPlan} width={1010} height={130} alt="" />
          </div>
          <h1 className="text-7xl text-primary font-normal text-center xs:text-3xl">
            Investment Plans
          </h1>
          <br />
          <h1 className="w-full text-2xl text-primary font-thin text-center">
            Your Path to Effortless Financial Growth
          </h1>
        </div>
        <br />
        <Slider cards={cards} />
        {/* <div className=" w-full grid grid-cols-3 gap-x-8 gap-y-8 lg:grid-cols-1 sm:gap-16 lg:gap-10 2xl:grid-cols-2 2xl:gap-y-16 xl:gap-y-16">
          <OfferCardItem
            years={10}
            title={`Medjool Trees`}
            investment={`10 - Years ROI would be `}
            cost={`EGP 250,000`}
            rows={[
              `EGP 25000 Annual ROI`,
              `Installment over 10 Months`,
              ` EGP 8000 installment per Month`,
              `30% Average ROI`,
              `EGP 70000 for Cash Payment`,
            ]}
            income={`80,000`}
          />
          <OfferCardItem
            years={5}
            title={`Medjool Trees`}
            investment={`10 - Years ROI would be `}
            cost={`EGP 125,000`}
            rows={[
              `EGP 12500 Annual ROI`,
              `Installment over 10 Months`,
              `EGP 4000 installment per Month`,
              `30% Average ROI`,
              `EGP 35000 for Cash Payment`,
            ]}
            income={`40,000`}
          />
          <SpecialOfferCard
            years={1}
            title={`Medjool Trees`}
            investment={`10 - Years ROI would be `}
            cost={`EGP 25,000`}
            rows={[
              `EGP 2500 Annual ROI`,
              `Installment over 10 Months`,
              `EGP 4000 installment per Month`,
              `30% Average ROI`,
              `EGP 7000 for Cash Payment`,
            ]}
            income={`8,000`}
          />
          <p>asd</p>
        </div> */}
      </div>
    </>
  );
};

export default Pricing;
