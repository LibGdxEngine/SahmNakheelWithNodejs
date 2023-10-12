import Layout from "../../components/Layout";
import {
  fetchRequest,
  getRequests,
  makeRequestFailed,
  userPublicProfile,
} from "../../actions/user";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import classes from "../../components/user/UserFinally.module.css";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../helpers/ProgressBar";
import RejectionModal from "../../components/chat/RejectionModal";
import { toast } from "react-toastify";
import { getCookie } from "../../actions/auth";
import TransitionEffect from "../../components/TransitionEffect";

const Finally = ({ request }) => {
  const [signedInUser, setSignedInUser] = useState(null);
  const reasons = [
    { id: 0, text: "حصل مشكلة مع الأهل" },
    { id: 1, text: "تم الرفض بسبب المغالاة في طلبات الزواج" },
    { id: 2, text: "لم يحدث قبول بعد الرؤية الشرعية" },
    { id: 3, text: "العريس لم يتصل بولي الأمر" },
    { id: 4, text: "مستوى التدين غير مناسب لي" },
    { id: 5, text: "ليس هناك توافق في الأفكار" },
    { id: 6, text: "سبب أخر" },
  ];
  const token = getCookie("token");
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isRejectionReasonModalOpen, setIsRejectionReasonModalOpen] =
    useState(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);

  const handleRejectionModal = () => {
    setIsRejectionModalOpen(true);
  };

  const handleCancelRejectionModal = () => {
    setIsRejectionModalOpen(false);
  };

  const handleOpenRejectionReasonModal = () => {
    setIsRejectionReasonModalOpen(true);
  };

  const handleCloseRejectionReasonModal = () => {
    setIsRejectionReasonModalOpen(false);
  };
  const handleConfirmInRejectionModal = () => {
    //show another modal with rejection reason
    handleOpenRejectionReasonModal();
    setIsRejectionModalOpen(false);
  };

  const handleConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const handleCancelConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const handleSubmitRejectionReason = (selectedReason) => {
    if (selectedReason.length === 0) {
      toast.warning("قم باختيار سبب واحد على الأقل");
      return;
    }
    //update the request status and add failerReason
    //update users status to be 0 instead of 1 for both users
    makeRequestFailed(request._id, token).then((data, err) => {
      if (err) {
        console.log(err);
      } else {
        router.push("/");
      }
    });
    setIsRejectionReasonModalOpen(false);
  };

  const loadingStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (loadingStatus === "loading") {
  } else if (loadingStatus === "succeeded") {
  } else if (loadingStatus === "failed") {
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (loadingStatus === "succeeded") {
        const userData = await userPublicProfile(user.username);
        const data = await getRequests(user.username, token);
        setSignedInUser(userData.user);

        const existsInSentRequests = data.sent.some(
          (obj) => obj._id === request._id
        );
        const existsInReceivedRequests = data.received.some(
          (obj) => obj._id === request._id
        );

        if (request.status !== 5) {
          router.push("/");
        }

        if (user.username === request.sender.username) {
          setOtherUser(request.reciever);
        } else if (user.username === request.reciever.username) {
          setOtherUser(request.sender);
        }
      }
    };
    fetchUser();
  }, [request, loadingStatus]);

  const [otherUser, setOtherUser] = useState();
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (request === null) {
      router.replace("/users");
    }
  }

  if (!otherUser) {
    return (
      <div className="container mx-auto p-4">
        <ProgressBar />
      </div>
    );
  }

  const showManDetails = () => {
    if (signedInUser.questions[37] === "لا") {
      return (
        <>
          <div style={{ display: "flex", direction: "rtl" }}>
            <p>لقد تم التوافق بينك وبين العريس كود .</p>
            <Link href={`/users/${otherUser.username}`}>
              {otherUser.username}
            </Link>
          </div>
          <p>
            وسوف يتم التواصل معكما من خلال أدمن الصفحة حتى يتم التنسيق بينكما
            وسيتم ترتيب جميع الأمور اللازمة حتى نخبر العريس بطريقة التواصل مع
            ولي الأمر
          </p>
          <h4>اسم العريس: {otherUser.name}</h4>
        </>
      );
    }
    return (
      <>
        <div style={{ display: "flex", direction: "rtl" }}>
          <p>لقد تم التوافق بينك وبين العريس كود .</p>
          <Link href={`/users/${otherUser.username}`}>
            {otherUser.username}
          </Link>
        </div>
        <p>ويجب أن يقوم العريس بالاتصال بولي أمرك خلال الـ48 ساعة القادمة </p>
        <h4>اسم العريس: {otherUser.name}</h4>
      </>
    );
  };

  const showWomanDetails = () => {
    if (otherUser.questions[37] === "لا") {
      return (
        <>
          <div style={{ display: "flex", direction: "rtl" }}>
            <p>لقد تم التوافق بينك وبين العروسة كود .</p>
            <Link href={`/users/${otherUser.username}`}>
              {otherUser.username}
            </Link>
          </div>
          <p>
            يجب أن تقوم بإدخال أحد محارمك (أختك - أمك -زوجتك) في جروب الدعم
            الخاص بالأخوات لكي تسأل عن كود عروستك وتقوم الأخوات بالتنسيق بينكما
            https://t.me/+VaVpo3p4URhmZjdk
          </p>
          <p>
            هذا الجروب للنساء فقط ويمنع دخول الرجال .. احرص على إدخال من تثق بهم
            من محارمك
          </p>
          <h4>اسم العروس: {otherUser.name}</h4>
        </>
      );
    }
    return (
      <>
        <div style={{ display: "flex", direction: "rtl" }}>
          <p>لقد تم التوافق بينك وبين العروسة كود .</p>
          <Link href={`/users/${otherUser.username}`}>
            {otherUser.username}
          </Link>
        </div>
        <p>
          ويجب عليك أن تقوم بالاتصال بولي أمر العروسة خلال 48 ساعة من تاريخ
          التوافق
        </p>
        <h4>رقم ولي أمر العروس: {otherUser.questions[15]}</h4>
        <h4>اسم العروس: {otherUser.name}</h4>
      </>
    );
  };

  const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
      <Modal className={classes["ConfirmationModal"]} isOpen={isOpen}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{message}</p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "space-evenly",
            }}
          >
            <button className="!text-dark" onClick={onConfirm}>
              نعم
            </button>
            <button className="!text-dark" onClick={onCancel}>
              الغاء
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <TransitionEffect />
      <Layout>
        <RejectionModal
          isOpen={isRejectionReasonModalOpen}
          onRequestClose={handleCloseRejectionReasonModal}
          onSubmit={handleSubmitRejectionReason}
          reasons={reasons}
        />
        <ConfirmationModal
          isOpen={isRejectionModalOpen}
          message="هل تريد حقا أن تنهي التواصل مع الطرف الأخر ؟"
          onConfirm={handleConfirmInRejectionModal}
          onCancel={handleCancelRejectionModal}
        />
        {user && request.status === 5 ? (
          <div className={classes["home__container"]}>
            <div className={classes["welcome__message_container"]}>
              <Image
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
                src={"/images/flower.png"}
                width={45}
                height={45}
                alt="flower"
              />
              <h3>مبارك عليكما</h3>
              <Image
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
                src={"/images/flower.png"}
                width={45}
                height={45}
                alt="flower"
              />
            </div>
            {otherUser.gender === "man" ? showManDetails() : showWomanDetails()}
            <br />
            <br />
            <h6>اذا كانت لديك أي مشكلة تواصل معنا عن طريق</h6>
            <Link href={"/contact"}>صفحة الدعم</Link>
            <br />
            <br />
            <h6>إذا أردت إنهاء إرتباطك بهذا الشخص يمكنك الضغط هنا</h6>
            <button
              onClick={handleRejectionModal}
              className={classes["submit"]}
            >
              إنهاء الارتباط
            </button>
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <ProgressBar />
          </div>
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { requestid } = context.query;

  let requestData = null;

  try {
    requestData = await fetchRequest(requestid);
  } catch (error) {
    console.error("Error fetching request data: ", error);
  }

  return {
    props: {
      request: requestData.data || null,
    },
  };
}

export default Finally;
