import { useRouter } from "next/router";
import {
  userPublicProfile,
  getUserStatusAndCheckInFavourites,
} from "../../actions/user";
import Layout from "../../components/Layout";
import UserInfo from "../../components/user/UserInfo";
import Blocked from "../../components/auth/Blocked";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "../../actions/auth";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
const crypto = require("crypto");

import { JWT_ACCOUNT_DETAILS_SECURITY_CODE } from "../../config";

const UserDetails = ({ userId }) => {
  const router = useRouter();
  const token = getCookie("token");

  const loadingStatus = useSelector((state) => state.auth.status);
  const signedInUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [user, setUser] = useState();
  const [userStatus, setUserStatus] = useState();
  const [inFavourites, setInFavourites] = useState();
  const [requestId, setRequestId] = useState();

  const getUserStatus = useCallback(async () => {
    await getUserStatusAndCheckInFavourites(
      signedInUser.username,
      userId,
      token
    ).then((data) => {
      if (data.error) {
        console.log("Error getting user status");
      } else {
        const decoded = jwt.decode(data);
        // Extract the encrypted data, iv, and auth tag
        const encryptedData = decoded.encryptedData;
        const iv = Buffer.from(decoded.iv, "hex");
        const authTag = Buffer.from(decoded.authTag, "hex");
        const secretKey = "12345678912345678912345678912345";
        // Decrypt the data using AES-GCM
        const decipher = crypto.createDecipheriv("aes-256-gcm", secretKey, iv);
        decipher.setAuthTag(authTag);

        let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
        decryptedData += decipher.final("utf-8");

        const { userStatus, requestId, isFavorite } = JSON.parse(decryptedData);

        setRequestId(requestId);
        setInFavourites(isFavorite);
        setUserStatus(userStatus);
      }
    });
  });

  const getUser = useCallback(async () => {
    await userPublicProfile(userId).then((data) => {
      if (data.error) {
        console.log("Error getting data");
      } else {
        setUser(data.user);
      }
    });

    return user;
  });

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    if (isAuthenticated && token) {
      getUserStatus();
    }
  }, [isAuthenticated]);

  if (!user || loadingStatus === "loading" || (!userStatus && token)) {
    return (
      <Layout>
        <div className="fixed flex w-full h-96 items-center justify-center">
          <h3>جاري التحميل...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <Blocked>
          {user && (
            <UserInfo
              user={user}
              requestId={requestId}
              userStatus={userStatus ? userStatus : ""}
              inFavourites={inFavourites}
              senderUser={{
                username: signedInUser ? signedInUser.username : "",
                confirmed: signedInUser ? signedInUser.confirmed : "",
                userStatus: signedInUser ? signedInUser.userStatus : "",
              }}
            />
          )}
        </Blocked>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { params, req } = context;
  const { slug } = params;

  let userId = slug;

  return { props: { userId } };
}

export default UserDetails;
