import { useEffect, useState } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { fetchFavourites, userPublicProfile } from "../../actions/user";
import Layout from "../../components/Layout";
import classes from "../../components/search/ManUserCard.module.css";
import WomanUserCard from "../../components/search/WomanUserCard";
import ManUserCard from "../../components/search/ManUserCard";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../helpers/ProgressBar";
import { useRouter } from "next/router";
import TransitionEffect from "../../components/TransitionEffect";
const Favoutrites = (props) => {
  const router = useRouter();
  const token = getCookie("token");

  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [usersOnlineStatus, setUsersOnlineStatus] = useState();
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      if (loadingStatus === "succeeded") {
        fetchFavourites(user.username, token).then((data, err) => {
          if (err) {
            console.log(err);
          } else {
            setFavourites(data.favourites);
            console.log(data.userOnlineStatus);
            setUsersOnlineStatus(data.userOnlineStatus);
          }
        });
      }
    };
    fetchUser();
  }, [loadingStatus]);

  if (loadingStatus === "idle") {
    return (
      <div className="container mx-auto p-4">
        <ProgressBar />
      </div>
    );
  } else if (loadingStatus === "loading") {
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
    !isAuthenticated &&
    typeof window !== "undefined"
  ) {
    router.push("/");
  }

  const showAllUsers = () => {
    return favourites.map((user, i) => {
      return (
        <div
          key={i}
          className="col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-12"
        >
          {user.gender === "man" ? (
            <ManUserCard
              user={user}
              isOnline={usersOnlineStatus[[`\"${user._id}\"`]].isOnline}
              lastSeen={
                usersOnlineStatus[[`\"${user._id}\"`]].isOnline
                  ? ""
                  : usersOnlineStatus[[`\"${user._id}\"`]].lastSeen
              }
            />
          ) : (
            <WomanUserCard
              user={user}
              isOnline={usersOnlineStatus[[`\"${user._id}\"`]].isOnline}
              lastSeen={
                usersOnlineStatus[[`\"${user._id}\"`]].isOnline
                  ? ""
                  : usersOnlineStatus[[`\"${user._id}\"`]].lastSeen
              }
            />
          )}
        </div>
      );
    });
  };

  return (
    <Layout>
      <TransitionEffect />

      <div
        className={`w-full h-full inline-block p-32 dark:bg-dark xl:p-24 lg:p-16 md:p-12 sm:p-8 pt-16 mb-16`}
      >
        <div className="w-full flex items-center justify-center">
          {favourites.length <= 0 && <p>ليس لديك أي محفوظات</p>}
        </div>
        <div className="grid grid-cols-12 gap-12 gap-y-24 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
          {favourites && showAllUsers()}
        </div>
      </div>
    </Layout>
  );
};

export default Favoutrites;
