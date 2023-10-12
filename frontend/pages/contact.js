import Head from "next/head";
import ContactForm from "../components/form/ContactForm";
import Layout from "../components/Layout";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../config";
import { useRouter } from "next/router";

const Contact = () => {
  const router = useRouter();
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
      <Layout>
        <div style={{ direction: "rtl" }} className="contaienr-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2 pt-3 pe-3 ps-3">
              <h2>يمكنك مراسلة الدعم من هنا</h2>
              <hr />
              <ContactForm />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
