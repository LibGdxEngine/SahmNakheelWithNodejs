import { useSelector } from "react-redux";
import SignupComponent from "../components/auth/Signup/SignupComponent";
import Layout from "../components/Layout";
import TransitionEffect from "../components/TransitionEffect";
import ProgressBar from "../helpers/ProgressBar";
import { useRouter } from "next/router";
import Head from "next/head";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../config";

const Signup = () => {
  const router = useRouter();
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
        <SignupComponent />
      </Layout>
    </>
  );
};

export default Signup;
