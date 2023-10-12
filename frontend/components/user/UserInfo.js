import classes from "./UserInfo.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addToFavourite,
  removeFromFavourite,
  sendAcceptanceRequest,
  rejectRequest,
  acceptRequest,
  userPublicProfile,
} from "../../actions/user";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { isAuth, getCookie } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../helpers/ProgressBar";
import { motion } from "framer-motion";
import TransitionEffect from "../TransitionEffect";
const UserInfo = (props) => {
  const user = props.user;
  const requestIdFromServer = props.requestId;
  const userStatusFromServer = props.userStatus;
  const inFavouritesFromServer = props.inFavourites;
  const senderUserFromRedux = props.senderUser;
  const router = useRouter();

  const [senderUser, setSenderUser] = useState(senderUserFromRedux);

  const token = getCookie("token");

  let userImage = "";
  if (user.gender === "man") {
    if (user.questions[23] === "ملتحي") {
      userImage = "man_with_le7ya2.png";
    } else if (user.questions[23] === "لحية خفيفة") {
      userImage = "man_with_small_le7ya2.png";
    } else if (user.questions[23] === "أملس") {
      userImage = "khemar2.png";
    }
  } else {
    if (user.questions[12] === "منتقبة سواد") {
      userImage = "niqab2.png";
    } else if (user.questions[12] === "منتقبة نقاب ملون") {
      userImage = "niqab_color2.png";
    } else if (user.questions[12] === "مختمرة") {
      userImage = "Khemar2.png";
    } else if (user.questions[12] === "طرح وفساتين") {
      userImage = "tr72.png";
    } else if (user.questions[12] === "طرح وبناطيل") {
      userImage = "banateel2.png";
    } else {
      userImage = "banateel2.png";
    }
  }
  const userFace = user.questions[23] === "ملتحي" ? "ملتحي" : "";

  const userManOrWoman = user.gender === "man" ? "عريس" : "عروسة";
  const generalStatus = user.questions[0];
  const whereYouLive = user.questions[1];
  const maleChilds = user.questions[2];
  const femaleChilds = user.questions[3];
  const height = user.questions[4];
  const wieght = user.questions[5];
  const age = user.questions[6];
  const skinColor = user.questions[7];
  const job = user.questions[8];
  const certificate = user.questions[9];
  const aboutYou = user.questions[10];
  const aboutYourPartner = user.questions[11];
  const hijab = user.questions[12];
  const pray = user.questions[13];
  const wantToTravel = user.questions[14];

  const city = user.questions[16];
  const childsAges = user.questions[17];
  const quran = user.questions[18];
  const fathersJob = user.questions[19];
  const mothersJob = user.questions[20];
  const brothersAndSisters = user.questions[21];
  const wantNiqab = user.questions[22];
  const man_with_le7ya = user.questions[23];
  const yourShaikh = user.questions[24];
  const understandingOfQwama = user.questions[25];
  const whereDoYouWork = user.questions[26];
  const fobia = user.questions[27];
  const isYourJobHalal = user.questions[28];
  const khetbaDawabet = user.questions[29];
  const yourGoalInLife = user.questions[50];
  const doYouStudyIslam = user.questions[31];
  const Azkar = user.questions[32];
  const undersandingOfSuccessInLife = user.questions[33];
  const sick = user.questions[34];
  const reasonOfDivorce = user.questions[35];
  const country = user.questions[36];

  const isFatherKnow = user.questions["37 "];
  const doYouAcceptIslam = user.questions["38 "];
  const doesYourFatherAcceptIslam = user.questions["39 "];

  const [userStatus, setUserStatus] = useState(userStatusFromServer.trim());
  const [requestId, setRequestId] = useState(requestIdFromServer);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  function handleModalOpen() {
    setModalIsOpen(true);
  }

  function handleModalClose() {
    setModalIsOpen(false);
  }
  const [inFavourites, setInFavourites] = useState(inFavouritesFromServer);
  const [loadingFavourite, setLoadingFavourite] = useState(false);
  const [loadingSendingAccept, setLoadingSendingAccept] = useState(false);

  const showSuccessMessage = (message) => {
    toast.success(`${message}`);
  };

  const showInfoMessage = (message) => {
    toast.info(`${message}`);
  };

  const showErrorMessage = (message) => {
    toast.error(`${message}`);
  };

  const handleSendAcceptance = (e) => {
    e.preventDefault();
    if (senderUser) {
      if (senderUser.confirmed === 0) {
        toast.error(
          "لا يمكنك ارسال طلب قبول الأن ...يجب عليك أن تنتظر حتى يتم تفعيل حسابك"
        );
        return;
      }
      if (senderUser.confirmed === 3) {
        toast.error(
          "لا يمكنك ارسال طلب قبول لأن حسابك معطل ...يجب عليك تفعيل حسابك"
        );
        return;
      }
      if (senderUser.confirmed === 4) {
        toast.error("لا يمكنك ارسال طلب قبول لأن حسابك محظور");
        return;
      }

      if (user.confirmed === 4) {
        toast.error("للأسف لا يمكنك ارسال طلب قبول لهذا الشخص لانه محظور");
        return;
      }
      if (user.userStatus === 1) {
        toast.error(
          "للأسف لا يمكنك ارسال طلب قبول لهذا الشخص لانه على تواصل الان بشخص أخر"
        );
        return;
      }
      if (senderUser.userStatus === 1) {
        toast.error("لا يمكنك ارسال طلب قبول لانك مرتبط بالفعل بشخص أخر");
        return;
      }
      if (user.userStatus === 2) {
        toast.error("لا يمكنك ارسال طلبات قبول لهذا الشخص لأن حسابه مرفوض");
        return;
      }
      if (senderUser.userStatus === 2) {
        toast.error("لا يمكنك ارسال طلب قبول لان حسابك تم رفض تسجيله");
        return;
      }

      setLoadingSendingAccept(true);
      if (senderUser) {
        sendAcceptanceRequest(senderUser.username, user.username, token).then(
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              //show pop up here
              if (data.message === "تم ارسال طلب القبول المبدئي بنجاح") {
                showSuccessMessage(data.message);
                setUserStatus("في انتظار الرد");
              } else if (
                data.message ===
                "لا يمكنك ارسال طلب جديد قبل انتهاء مدة طلبك السابق"
              ) {
                showErrorMessage(data.message);
              } else {
                showInfoMessage(data.message);
              }
              setLoadingSendingAccept(false);
            }
          }
        );
      } else {
        setLoadingSendingAccept(false);
        //show pop up here
        console.log("You are not allowed to send request, login first");
      }
    } else {
      showInfoMessage(`يجب عليك تسجيل حسابك أولا!`);
    }
  };

  const handleAddRemoveFromFavourite = (e) => {
    e.preventDefault();
    setLoadingFavourite(true);
    if (senderUser) {
      if (inFavourites) {
        removeFromFavourite(senderUser.username, user.username, token).then(
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              showSuccessMessage("تمت الازالة من قائمة المحفوظات");
              setInFavourites(false);
            }
            setLoadingFavourite(false);
          }
        );
      } else {
        addToFavourite(senderUser.username, user.username, token).then(
          (data, err) => {
            if (err) {
              console.log(err);
            } else {
              showSuccessMessage("تمت الاضافة إلى قائمة المحفوظات");
              setInFavourites(true);
            }
            setLoadingFavourite(false);
          }
        );
      }
    } else {
      //TODO: show pop here
      showErrorMessage("يجب عليك تسجيل حسابك أولا!");
      setLoadingFavourite(false);
    }
  };

  const handleRejectRequest = (e) => {
    e.preventDefault();
    rejectRequest(requestId, token).then((data, err) => {
      if (err) {
        showErrorMessage(err);
      } else {
        showInfoMessage(data.message);
        setUserStatus("تم الرفض");
      }
    });
  };

  const handleAcceptRequest = (e) => {
    e.preventDefault();

    acceptRequest(requestId, token).then((data, err) => {
      if (err) {
        showErrorMessage(err);
      } else {
        showSuccessMessage(data.message);
        setUserStatus("مرحلة الأسئلة");
      }
    });
  };

  const showAddToFavouriteBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/bookmark.png"}
          width={50}
          height={50}
          alt={""}
        />
        {loadingFavourite ? (
          <p className="w-full text-dark text-center ">جاري التحميل</p>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "50vw" }}
            onClick={handleAddRemoveFromFavourite}
            className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
          >
            {!inFavourites && "اضافة للمحفوظات"}
            {inFavourites && "ازالة المحفوظات"}
          </motion.button>
        )}
      </div>
    );
  };

  const showReportBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/report.png"}
          width={50}
          height={50}
          alt={""}
        />

        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          style={{ maxWidth: "50vw" }}
          onClick={handleModalOpen}
          className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
        >
          تبليغ عن مخالفة
        </motion.button>
      </div>
    );
  };

  const showRejectBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/send_reject.png"}
          width={50}
          height={50}
          alt={""}
        />
        {loadingFavourite ? (
          <p className="w-full text-dark text-center ">جاري التحميل</p>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "50vw" }}
            onClick={handleRejectRequest}
            className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
          >
            رفض الطلب
          </motion.button>
        )}
      </div>
    );
  };

  const showAcceptBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/send_accept.png"}
          width={50}
          height={50}
          alt={""}
        />
        {loadingFavourite ? (
          <p className="w-full text-dark text-center ">جاري التحميل</p>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "50vw" }}
            onClick={handleAcceptRequest}
            className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
          >
            قبول الطلب
          </motion.button>
        )}
      </div>
    );
  };

  const showSendAcceptBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/send_accept.png"}
          width={50}
          height={50}
          alt={""}
        />
        {loadingSendingAccept ? (
          <p className="w-full text-dark text-center ">جاري التحميل</p>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "50vw" }}
            onClick={handleSendAcceptance}
            className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
          >
            ارسال طلب قبول
          </motion.button>
        )}
      </div>
    );
  };

  const showWaitingReponseBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/waiting.png"}
          width={50}
          height={50}
          alt={""}
        />
        {loadingFavourite ? (
          <p className="w-full text-dark text-center ">جاري التحميل</p>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "50vw" }}
            onClick={() => {
              showInfoMessage(
                ` يجب عليك انتظار الرد من الطرف الأخر خلال 24 ساعة`
              );
            }}
            className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
          >
            في انتظار الرد
          </motion.button>
        )}
      </div>
    );
  };

  const showQuestionsStageBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/questions.png"}
          width={50}
          height={50}
          alt={""}
        />
        {loadingFavourite ? (
          <p className="w-full text-dark text-center ">جاري التحميل</p>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "50vw" }}
            onClick={() => {
              router.push(
                `/questions/${requestId}-${senderUser.username}-${user.username}`
              );
            }}
            className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
          >
            مرحلة الأسئلة
          </motion.button>
        )}
      </div>
    );
  };

  const showYouAlreadyRejectedBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/send_reject.png"}
          width={50}
          height={50}
          alt={""}
        />
        {loadingFavourite ? (
          <p className="w-full text-dark text-center ">جاري التحميل</p>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "50vw" }}
            onClick={() => {
              toast.info(
                "لا يمكنك ارسال طلب لهذا الشخص بعد أن تم الرفض بينكما"
              );
            }}
            className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
          >
            تم الرفض
          </motion.button>
        )}
      </div>
    );
  };

  const showYouAlreadyAcceptedBtn = () => {
    return (
      <div className={`flex items-center justify-between mb-2`}>
        <Image
          className={classes["options-icon"]}
          src={"/images/accepted.png"}
          width={50}
          height={50}
          alt={""}
        />
        {loadingFavourite ? (
          <p className="w-full text-dark text-center ">جاري التحميل</p>
        ) : (
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            style={{ maxWidth: "50vw" }}
            onClick={() => {
              router.push(`/user/${requestId}`);
            }}
            className="w-full !bg-primary p-2 text-white mx-3 rounded-lg"
          >
            تم القبول
          </motion.button>
        )}
      </div>
    );
  };

  return (
    <>
      <TransitionEffect />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        className={classes["custom-modal"]}
      >
        <h2>ما هي المخالفة التي تريد الابلاغ عنها؟</h2>
        <input type="text" style={{ direction: "rtl" }} />
        <button
          onClick={() => {
            if (senderUser) {
              showInfoMessage(`شكرا لك ,لقد تم ارسال البلاغ للادراة`);
            } else {
              showInfoMessage(`يجب عليك تسجيل حسابك أولا!`);
            }
            setModalIsOpen(false);
          }}
        >
          تبليغ الادارة
        </button>
      </Modal>

      <div className={classes["fullContainer"]}>
        <div className={classes["info-head"]}>
          {senderUser && senderUser.username !== user.username && (
            <>
              <div className={classes["options-container"]}>
                {userStatus === "ارسال طلب قبول" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showSendAcceptBtn()}
                    {/* {showReportBtn()} */}
                  </>
                )}

                {userStatus === "في انتظار الرد" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showWaitingReponseBtn()}
                    {/* {showReportBtn()} */}
                  </>
                )}

                {userStatus === "قبول الطلب" && (
                  <>
                    {showRejectBtn()}
                    {showAcceptBtn()}
                    {/* {showReportBtn()} */}
                  </>
                )}

                {userStatus === "مرحلة الأسئلة" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showQuestionsStageBtn()}
                    {/* {showReportBtn()} */}
                  </>
                )}

                {userStatus === "تم الرفض" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showYouAlreadyRejectedBtn()}
                    {/* {showReportBtn()} */}
                  </>
                )}

                {userStatus === "تم القبول" && (
                  <>
                    {showAddToFavouriteBtn()}
                    {showYouAlreadyAcceptedBtn()}
                    {/* {showReportBtn()} */}
                  </>
                )}
              </div>
            </>
          )}

          <div
            dir="rtl"
            className={`w-full flex flex-col items-start justify-between text-2xl !text-dark 2xl:text-2xl xl:text-xl lg:items-center`}
          >
            <h3>كود {user.username}</h3>
            <h3>
              {userManOrWoman} {userFace} - {age} سنة
            </h3>
            <h3>
              الجنسية - {country} - {user.gender === "man" ? "يعيش" : "تعيش"} في{" "}
              {whereYouLive} - {city}
            </h3>
            <h3>الحالة الاجتماعية - {generalStatus}</h3>
          </div>

          <div className={`w-64 lg:mt-32 sm:w-56`}>
            <Image
              className={`w-full`}
              src={`/images/${userImage}`}
              width={800}
              height={800}
              alt={""}
              priority="true"
            />
          </div>
        </div>
      </div>
      <div className={classes["other-info"]}>
        <br />
        <br />
        <h1 className={classes["info-title"]}>المعلومات العامة</h1>
        <br />
        {age && <p>العمر - {age} سنة</p>}
        {height && <p>الطول - {height}</p>}
        {wieght && <p>الوزن - {wieght}</p>}
        {skinColor && <p>لون البشرة - {skinColor}</p>}
        {job && <p> الوظيفة - {job}</p>}
        {sick && <p>هل تعاني من أي أمراض أو اعاقات - {sick}</p>}
        {fobia && <p>هل تعاني من الخوف المفرط تجاه بعض الأشياء؟ - {fobia}</p>}
        {certificate && <p>الشهادة - {certificate}</p>}
        {aboutYou && <p>تكلم عن نفسك - {aboutYou}</p>}
        {aboutYourPartner && (
          <p> المواصفات المطلوبة في زوجك - {aboutYourPartner}</p>
        )}

        <br />
        <br />
        <h1 className={classes["info-title"]}> معلومات عن الدين </h1>
        <br />
        {pray && <p>مدى الالتزام بالصلاة - {pray}</p>}
        {hijab && <p>نوع الحجاب - {hijab}</p>}
        {man_with_le7ya && <p>هل أنت ملتحي - {man_with_le7ya}</p>}
        {quran && <p>ما مقدار حفظك للقران - {quran}</p>}
        {Azkar && <p>هل تحافظ على أذكار الصباح والمساء؟ - {Azkar}</p>}
        {yourShaikh && <p>من هم شيوخك؟ - {yourShaikh}</p>}
        {wantNiqab && <p>هل لديك استعداد للنقاب؟ - {wantNiqab}</p>}
        {isYourJobHalal && <p>هل عملك الذي تعمل به حلال؟ - {isYourJobHalal}</p>}
        {doYouStudyIslam && (
          <p>هل لك نصيب من طلب العلم الشرعي؟- {doYouStudyIslam}</p>
        )}
        {khetbaDawabet && (
          <p>
            هل أنت على دراية بضوابط الخطبة الشرعية ومستعد للالتزام بها؟{" "}
            {khetbaDawabet}
          </p>
        )}
        <br />
        <br />
        {(reasonOfDivorce ||
          maleChilds ||
          femaleChilds ||
          childsAges ||
          isFatherKnow ||
          doYouAcceptIslam ||
          doesYourFatherAcceptIslam ||
          fathersJob ||
          mothersJob ||
          brothersAndSisters) && (
          <h1 className={classes["info-title"]}>معلومات عن الأسرة/ السكن</h1>
        )}
        <br />

        {maleChilds && <p>عدد الأولاد الذكور - {maleChilds}</p>}
        {femaleChilds && <p>عدد البنات - {femaleChilds}</p>}
        {childsAges && <p> أعمار الأولاد - {childsAges}</p>}
        {fathersJob && <p>عمل الوالد - {fathersJob}</p>}
        {mothersJob && <p>عمل الوالدة - {mothersJob}</p>}
        {brothersAndSisters && (
          <p>عدد الإخوة والأخوات - {brothersAndSisters}</p>
        )}
        {reasonOfDivorce && <p>سبب الانفصال - {reasonOfDivorce}</p>}

        <br />
        <br />
        {(yourGoalInLife ||
          undersandingOfSuccessInLife ||
          wantToTravel ||
          whereDoYouWork ||
          understandingOfQwama) && (
          <h1 className={classes["info-title"]}>
            معلومات عن الأفكار والمفاهيم
          </h1>
        )}
        <br />
        {yourGoalInLife && <p>ما هو هدفك في الحياة - {yourGoalInLife}</p>}
        {undersandingOfSuccessInLife && (
          <p>
            ما هو مفهومك عن النجاح في الحياة - {undersandingOfSuccessInLife}
          </p>
        )}
        {understandingOfQwama && (
          <p>ما مفهومك للقوامة - {understandingOfQwama}</p>
        )}
        {wantToTravel && <p>هل لديك رغبة في السفر؟ - {wantToTravel}</p>}
        {whereDoYouWork && <p>أين تعمل تحديدا؟ - {whereDoYouWork}</p>}
        {isFatherKnow && (
          <p>هل يعلم ولي أمرك بشأن هذا الموقع؟ - {isFatherKnow}</p>
        )}
        {doYouAcceptIslam && (
          <p>
            هل تقبلين أن تتزوجي بدون قائمة منقولات على أن يتكفل الزوج بكل شيء
            حسب استطاعته؟ - {doYouAcceptIslam}
          </p>
        )}
        {doesYourFatherAcceptIslam && (
          <p>
            هل يقبل والدك أن تتزوجي بدون قائمة منقولات على أن يتكفل الزوج بكل
            شيء حسب استطاعته ؟ - {doesYourFatherAcceptIslam}
          </p>
        )}
      </div>
    </>
  );
};

export default UserInfo;
