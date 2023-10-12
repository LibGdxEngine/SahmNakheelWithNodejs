import React from "react";
import Layout from "../components/Layout";
import SigninComponent from "../components/auth/Signin/SigninComponent";
import { withRouter } from "next/router";
import { useSelector } from "react-redux";
import ProgressBar from "../helpers/ProgressBar";
import TransitionEffect from "../components/TransitionEffect";
import Head from "next/head";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../config";
const SignIn = ({ router }) => {
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
    isAuthenticated &&
    typeof window !== "undefined"
  ) {
    router.push("/user");
  }
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };
  const head = () => {
    const title = `${APP_NAME} - للزواج الإسلامي`;
    return (
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="التطبيق الأول للزواج الإسلامي الذي يرضي الله عز وجل"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`تزوج لتسكن | ${APP_NAME}`} />
        <meta
          name="og:description"
          content="الزواج سنة النبي صلى الله عليه وسلم"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${DOMAIN}/images/logo.png`} />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/static/images/logo.png`}
        />
        <meta property="og:image:type" content={`image/png`} />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };
  return (
    <>
      {head()}
      <TransitionEffect />
      <Layout>
        <div className="row justify-content-md-center m-0">
          <div className="col-md-5">{showRedirectMessage()}</div>
        </div>
        <SigninComponent />
      </Layout>
    </>
  );
};

export default withRouter(SignIn);
