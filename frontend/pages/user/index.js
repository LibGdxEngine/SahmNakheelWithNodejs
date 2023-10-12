import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";
import classes from "../../components/user/userProfile.module.css";
import { useState } from "react";
import { deactivateAccount, activateAccount } from "../../actions/user";

import { toast } from "react-toastify";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../helpers/ProgressBar";
import { getCookie } from "../../actions/auth";
import TransitionEffect from "../../components/TransitionEffect";
import { motion } from "framer-motion";
import AccountDeactivationModal from "../../helpers/AccountDeactivationModal";
import Head from "next/head";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../config";

const UserIndex = () => {
  const router = useRouter();
  const token = getCookie("token");
  const [isDeactivationModalOpen, setDeactivationModalOpen] = useState(false);
  const [isActivationModalOpen, setActivationModalOpen] = useState(false);
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
    !isAuthenticated &&
    typeof window !== "undefined"
  ) {
    router.push("/");
  }

  let accountStatus = "";
  if (user) {
    if (user.confirmed === 0) {
      accountStatus = "تحت المراجعة";
    } else if (user.confirmed === 1) {
      accountStatus = "تم تفعيل الحساب";
    } else if (user.confirmed === 2) {
      accountStatus = "تم رفض 'طلب التسجيل'";
    } else if (user.confirmed === 3) {
      accountStatus = "معطل";
    } else if (user.confirmed === 4) {
      accountStatus = "تم حظر حسابك";
    }
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

  const handleDeactivation = (e) => {
    deactivateAccount(user.username, token).then((data, err) => {
      if (err) {
        toast.error("حدث خطأ أثناء تعطيل الحساب . حاول مجددا");
      } else {
        // Dispatch the setUser action with the updated user data
        const updatedUser = { ...user, confirmed: 3 };

        toast.success("تم تعطيل الحساب بنجاح", {
          onClose: () => {
            router.reload();
          },
        });
      }
    });
    setDeactivationModalOpen(false);
  };

  const handleActivation = (e) => {
    activateAccount(user.username, token).then((data, err) => {
      if (err) {
        toast.error("حدث خطأ أثناء تعطيل الحساب . حاول مجددا");
      } else {
        // Dispatch the setUser action with the updated user data
        const updatedUser = { ...user, confirmed: 3 };

        toast.success("تم تفعيل الحساب بنجاح", {
          onClose: () => {
            router.reload();
          },
        });
      }
    });
    setActivationModalOpen(false);
  };

  const handleCancelActivationModal = () => {
    setActivationModalOpen(false);
  };

  const handleCancelDeactivationModal = () => {
    setDeactivationModalOpen(false);
  };

  const ActivationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return <></>;
    return (
      <Modal className={classes["DeactivationModal"]} isOpen={isOpen}>
        <div>
          <p>{message}</p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "space-evenly",
            }}
          >
            <button onClick={onConfirm}>نعم</button>
            <button onClick={onCancel}>الغاء</button>
          </div>
        </div>
      </Modal>
    );
  };

  const DeactivationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return <></>;
    // return (
    //   <Modal className={classes["DeactivationModal"]} isOpen={isOpen}>
    //     <div>
    //       <p>{message}</p>
    //       <div
    //         style={{
    //           width: "100%",
    //           display: "flex",
    //           justifyContent: "space-evenly",
    //           alignItems: "space-evenly",
    //         }}
    //       >
    //         <button onClick={onConfirm}>نعم</button>
    //         <button onClick={onCancel}>الغاء</button>
    //       </div>
    //     </div>
    //   </Modal>
    // );
  };

  const handleConfirmDeactivationModal = () => {
    handleDeactivation();
  };

  const handleConfirmActivationModal = () => {
    handleActivation();
  };

  return (
    <>
      {head()}
      <TransitionEffect />
      <Layout>
        <Private>
          {user ? (
            <div dir="rtl">
              <AccountDeactivationModal
                isOpen={isDeactivationModalOpen}
                onSubmit={handleConfirmDeactivationModal}
                onClose={handleCancelDeactivationModal}
                submitMesssage="تعطيل"
                closeMessage="تراجع"
              >
                <h1>
                  هل تريد حقا تعطيل حسابك بحيث لا تظهر استمارتك للأخرين ولن
                  يمكنك استقبال أي طلبات قبول منهم؟
                </h1>
              </AccountDeactivationModal>

              <AccountDeactivationModal
                isOpen={isActivationModalOpen}
                onSubmit={handleConfirmActivationModal}
                onClose={handleCancelActivationModal}
                submitMesssage="تفعيل"
                closeMessage="تراجع"
              >
                <h1>هل تريد إعادة تفعيل حسابك ؟</h1>
              </AccountDeactivationModal>
              <ActivationModal />
              <div className="mx-8">
                <h1>البيانات العامة</h1>
                <h3 className={classes["container__text"]}>
                  الكود: {user.username}
                </h3>
                <h3 className={classes["container__text"]}>
                  الإسم: {user.name}
                </h3>
                <h3 className={classes["container__text"]}>
                  البريد: {user.email}
                </h3>
                <h3 className={classes["container__text"]}>
                  رقم الهاتف: {user.phone}
                </h3>
                <h3 className={classes["container__text"]}>
                  حالة الحساب: {accountStatus}
                </h3>
                <div>
                  <div style={{ textAlign: "center" }}>
                    {user.role === 1 ? (
                      <>
                        <Link style={{ textDecoration: "none" }} href="/admin">
                          <button className={`${classes["submit"]}`}>
                            صفحة الإدارة
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href={"/user/update"}>
                          <motion.button
                            type="button"
                            whileHover={{ y: -2 }}
                            style={{ maxWidth: "20vw" }}
                            className="w-1/2 !bg-primary p-2 !text-white mx-3 rounded-lg border !border-fourth"
                          >
                            تعديل البيانات
                          </motion.button>
                        </Link>
                        {user.confirmed === 2 ||
                        user.confirmed === 4 ||
                        user.confirmed === 0 ? (
                          ""
                        ) : (
                          <motion.button
                            onClick={() => {
                              if (user && user.confirmed === 3) {
                                // toast.info("تواصل مع الدعم لإعادة تفعيل حسابك");
                                setActivationModalOpen(true);
                              } else {
                                setDeactivationModalOpen(true);
                              }
                            }}
                            type="button"
                            whileHover={{ y: -2 }}
                            style={{ maxWidth: "20vw" }}
                            className="w-1/2 !bg-primary p-2 !text-white mx-3 rounded-lg border !border-fourth"
                          >
                            {user && user.confirmed === 3
                              ? "تفعيل الحساب"
                              : "تعطيل الحساب"}
                          </motion.button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto p-4">
              <ProgressBar />
            </div>
          )}
        </Private>
      </Layout>
    </>
  );
};

export default UserIndex;
