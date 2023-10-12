import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { useState } from "react";
import { userPublicProfile } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../helpers/ProgressBar";

const Admin = ({ children }) => {
  const router = useRouter();
  const token = getCookie("token");

  if (!token && typeof window !== "undefined") {
    router.push("/");
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
  } else if (loadingStatus === "failed") {
  }

  if (
    loadingStatus === "succeeded" &&
    user.role === 0 &&
    typeof window !== "undefined"
  ) {
    router.push("/");
  }

  return <>{children}</>;
};

export default Admin;
