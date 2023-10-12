import moment from "moment/moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCookie } from "../../actions/auth";
import {
  confirmUser,
  getMenThatNeedConfirmations,
  getQuestions,
  rejectUser,
} from "../../actions/user";

const ConfirmationsListForMen = () => {
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState();
  const token = getCookie("token");

  useEffect(() => {
    loadQuestions();
    loadUsers();
  }, []);

  const loadQuestions = () => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  };

  const loadUsers = () => {
    getMenThatNeedConfirmations(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUser(data.user);
      }
    });
  };

  const downloadImage = (base64String, fileName) => {
    const byteString = atob(base64String.split(",")[1]);
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmUserAction = (username) => {
    confirmUser(username, token).then((data) => {
      if (data.error) {
        toast.error(data.error);
        console.log(data.error);
      } else {
        toast.success(data.message);
        setMessage(data.message);
        loadUsers();
      }
    });
  };

  const rejectUserAction = (username) => {
    rejectUser(username, token).then((data) => {
      if (data.error) {
        toast.error(data.error);
        console.log(data.error);
      } else {
        toast.success(data.message);
        setMessage(data.message);
        loadUsers();
      }
    });
  };

  const Confirm = (username) => {
    let answer = window.confirm("هل انت متأكد أنك تريد تأكيد هذا الطلب");
    if (answer) {
      confirmUserAction(username);
    }
  };

  const Reject = (username) => {
    let answer = window.confirm("هل أنت متأكد أنك تريد رفض هذا الطلب");
    if (answer) {
      rejectUserAction(username);
    }
  };

  const userInfo = (user) => {
    const infoList = [];

    for (let x in user.questions) {
      if (user.questions[x].trim() !== "") {
        infoList.push(
          <p className="container" key={x}>{`${questions[x.trim()]}   :  ${
            user.questions[x]
          }`}</p>
        );
      }
    }
    return infoList;
  };

  const showLoadedUsers = () => {
    const info = `${moment(user.createdAt).fromNow()}`;
    return (
      <div dir="rtl" className="pb-5">
        <h3 className="text-2xl font-bold mb-4">{user.name}</h3>
        <div className="flex flex-wrap">
          {user.idNumber && (
            <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:pr-4">
              {user.idNumber && (
                <h1 className="text-2xl font-bold mb-2">{user.idNumber}</h1>
              )}
              {user.idPhoto1 && (
                <Image
                  src={`${user.idPhoto1}`}
                  width={400}
                  height={200}
                  alt={""}
                  className="rounded shadow"
                />
              )}
              {user.idPhoto1 && (
                <Image
                  className="mt-2 rounded shadow"
                  src={`${user.idPhoto2}`}
                  width={400}
                  height={200}
                  alt={""}
                />
              )}
            </div>
          )}

          <div className="w-full md:w-1/2 lg:w-2/3 mb-4 md:pl-4">
            {userInfo(user)}
          </div>
        </div>

        <button
          className="bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 mb-2"
          onClick={() => Reject(user.username)}
        >
          رفض الطلب
        </button>
        <button
          className="bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 mb-2"
          onClick={() => {
            Confirm(user.username);
          }}
        >
          تأكيد الطلب
        </button>
        <button
          className="bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={() => {
            downloadImage(user.idPhoto1, `${user.idNumber}`);
            downloadImage(user.idPhoto2, `${user.idNumber}`);
          }}
        >
          تحميل الصور
        </button>
        <hr className="my-4" />
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* {message && <div className="alert alert-warning">{message}</div>} */}
            {user && showLoadedUsers()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationsListForMen;
