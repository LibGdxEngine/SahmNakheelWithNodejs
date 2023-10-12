import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  adminUpdateIdNumber,
  adminUpdatePhone,
  blockUser,
  getQuestions,
  searchUser,
  update,
} from "../../actions/user";
import { getCookie } from "../../actions/auth";
import { toast } from "react-toastify";
import SearchUserItem from "./SearchUserItem";
import UserInfoModal from "../../helpers/UserInfoModal";

const SearchUsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const token = getCookie("token");
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState();
  const [questions, setQuestions] = useState();
  const [idNumber, setIdNumber] = useState("");
  const [showIdConfirmBtn, setShowIdConfirmBtn] = useState(false);
  const [phone, setPhone] = useState("");
  const [showPhoneConfirmBtn, setShowPhoneConfirmBtn] = useState(false);

  const handleIdNumberChange = (event) => {
    const { name, value } = event.target;
    setIdNumber(value);
  };

  const handlePhoneChange = (event) => {
    const { name, value } = event.target;
    setPhone(value);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  };

  const handleOpenInfoModal = (user) => {
    setSelectedUserInfo(user);
    setInfoModalIsOpen(true);
  };

  const handleCloseInfoModal = () => {
    setInfoModalIsOpen(false);
  };

  const Block = (user) => {
    let answer = window.confirm(`هل تريد حقا حظر هذا المستخدم`);
    if (answer) {
      user.confirmed = 4;
      blockUser(user.username, token).then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        toast.success(data.message);
      });
    }
  };

  const showLoadedUsers = () => {
    return users.map((user, i) => {
      // const info = `Written by ${blog.postedBy.name} | Published on ${" "}
      //   ${moment(blog.updatedAt).fromNow()}`;
      const date = new Date(user.createdAt);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        calendar: "islamic",
      };
      const formattedDate = date.toLocaleDateString(
        "ar-EG-u-ca-islamic",
        options
      );
      let gender = user.gender === "man" ? "عريس" : "عروسة";
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

      return (
        <>
          <SearchUserItem
            key={user._id}
            title={`${gender} كود ${user.username}`}
            userStatus={`حالة الحساب: ${accountStatus}`}
            date={`${formattedDate}`}
            onClick={() => {
              handleOpenInfoModal(user);
            }}
          />
        </>
      );
    });
  };

  const updateUsersIdNumber = (e) => {
    adminUpdateIdNumber(token, selectedUserInfo.username, idNumber).then(
      (data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success("تم تحديث الرقم القومي بنجاح");
        }
      }
    );
  };

  const updateUsersPhone = (e) => {
    adminUpdatePhone(token, selectedUserInfo.username, phone).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success("تم تحديث رقم الهاتف بنجاح");
      }
    });
  };

  const handleSearch = (e) => {
    //search here
    searchUser(inputValue, token).then((data) => {
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setUsers(data.users);
      setIdNumber(data.users[0].idNumber);
      setPhone(data.users[0].phone);
    });
  };

  const userInfo = (user) => {
    const infoList = [];

    infoList.push(
      <p
        className="container"
        key={"username"}
      >{`الكود :  ${user.username}`}</p>
    );
    infoList.push(
      <p className="container" key={"name"}>{`الاسم :  ${user.name}`}</p>
    );
    infoList.push(
      <>
        <p
          className="container"
          key={"idNumber"}
        >{`الرقم القومي :  ${idNumber}`}</p>
        <input
          className="border border-black"
          type="text"
          name="idNumber"
          value={idNumber}
          onChange={handleIdNumberChange}
          required
        />
        <button
          onClick={updateUsersIdNumber}
          className="w-15 !bg-primary  p-2 !text-white mx-3 rounded-lg border !border-white"
        >
          تحديث الرقم القومي
        </button>
      </>
    );
    infoList.push(
      <>
        <p className="container" key={"phone"}>{`رقم الهاتف  :  ${phone}`}</p>
        <input
          className="border border-black"
          type="text"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
        <button
          onClick={updateUsersPhone}
          className="w-15 !bg-primary  p-2 !text-white mx-3 rounded-lg border !border-white"
        >
          تحديث رقم الهاتف
        </button>
      </>
    );
    infoList.push(
      <p
        className="container"
        key={"email"}
      >{`البريد الالكتروني   :  ${user.email}`}</p>
    );
    infoList.push(
      <p
        className="container"
        key={"createdAt"}
      >{`تاريخ التسجيل  :  ${user.createdAt}`}</p>
    );
    infoList.push(
      <p className="container" key={"userStatus"}>{`امكانية ارسال الطلبات :  ${
        user.userStatus === 1 ? "لا يمكنه ارسال طلبات" : "يمكنه ارسال طلبات"
      }`}</p>
    );
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

  return (
    <>
      <UserInfoModal
        isOpen={infoModalIsOpen}
        onClose={handleCloseInfoModal}
        onBlock={() => {
          if (selectedUserInfo) {
            Block(selectedUserInfo);
          }
        }}
      >
        {selectedUserInfo && questions && userInfo(selectedUserInfo)}
      </UserInfoModal>
      <div
        dir={`rtl`}
        className="w-full mb-16  flex flex-col items-center justify-center overflow-hidden dark:text-light mt-4"
      >
        <div className="flex items-center bg-white rounded-full border border-solid border-dark px-4">
          <input
            className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
            id="search"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            type="text"
            placeholder="اكتب الكود او الايميل او رقم الهاتف"
          />

          <div className="p-4 ">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-10 h-10 flex items-center justify-center"
            >
              <svg
                className="text-white h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M18.707 4.293a1 1 0 00-1.414 0L8 13.586 4.707 10.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l11-11a1 1 0 000-1.414z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full mt-8 px-8">{showLoadedUsers()}</div>
      </div>
    </>
  );
};

export default SearchUsersPage;
