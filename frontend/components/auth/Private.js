import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../helpers/ProgressBar";
import { getCookie } from "../../actions/auth";
import jwt from "jsonwebtoken";

const Private = ({ children }) => {
  const router = useRouter();
  const token = getCookie("token");

  if (!token && typeof window !== "undefined") {
    router.push("/");
  }

  const decodedToken = jwt.decode(token);
  let userId = "";
  if (decodedToken) {
    const { _id } = decodedToken;
    userId = _id;
  }

  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (loadingStatus === "loading") {
    return (
      <div className="container mx-auto p-4">
        <ProgressBar />
      </div>
    );
  } else if (loadingStatus === "succeeded") {
    if (decodedToken && userId !== user._id && typeof window !== "undefined") {
      //some one tries to hack our website, block him
      router.push("/");
    }
  } else if (loadingStatus === "failed") {
  }

  return <>{children}</>;
};

export default Private;
