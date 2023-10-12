import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./ManUserCard.module.css";
import UserCard from "../user/UserCard";
import ProjectImg1 from "../../public/images/logo.png";
const ManUserCard = (props) => {
  const user = props.user;
  const isOnline = props.isOnline;
  const lastSeen = props.lastSeen;
  const router = useRouter();

  const gender = "عريس";
  let le7ya = "";
  if (user.questions[23] == "ملتحي") {
    le7ya = "ملتحي";
  } else if (user.questions[23] == "لحية خفيفة") {
    le7ya = "";
  } else {
    le7ya = "أملس";
  }

  const age = user.questions[6];
  const country = user.questions[1];
  const state = user.questions[16];
  const nationality = user.questions[36];
  const generalStatus = user.questions[0];

  const bookmark = "/images/saved_icon.svg";
  const image =
    le7ya == "ملتحي" ? "/images/man_with_le7ya2.png" : "/images/man_with_small_le7ya2.png";

  return (
    <UserCard
      title={`${gender} ${le7ya} ${age} سنة`}
      link={`/users/${user.username}`}
      type={`يعيش في ${country} ${state && "-"} ${state} `}
      where={`الحالة الاجتماعية: ${generalStatus}`}
      github={`/`}
      img={image}
      imageSize={'w-full'}
      isOnline={isOnline}
      lastSeen={lastSeen}
    />
  );
  return (
    <>
      <div className={classes.box}>
        {/* <img
          onClick={() => {
            console.log("Hello Image");
          }}
          src={bookmark}
          alt="bookmark"
        /> */}
        <div
          onClick={() => {
            router.push(`/users/${user.username}`);
          }}
        >
          <div className={classes.image}>
            <Image width={120} height={120} src={image} alt="niqab" />
          </div>
          <div className={classes.text}>
            <span>
              {gender} {le7ya} {age} سنة
            </span>
            <br />
            <span>
              يعيش في {country} {state && "-"} {state}
            </span>
            <br />
            <span>الجنسية من: {nationality}</span>
            <br />
            <span>الحالة الاجتماعية: {generalStatus}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManUserCard;
