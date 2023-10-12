import { useCallback, useState } from "react";
import { useEffect } from "react";
import { getUsersNeedContact } from "../../../actions/user";
import { getCookie } from "../../../actions/auth";
import RequestItem from "../../../helpers/RequestItem";
import NeedContactRequest from "../../../helpers/NeedContactRequest";
import Layout from "../../../components/Layout";
const UsersNeedContact = () => {
  const token = getCookie("token");

  const [requests, setRequests] = useState();
  const fetchRequests = useCallback(async () => {
    if (token) {
      const response = await getUsersNeedContact(token);
      setRequests(response.data);
    }
  }, [token]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const showLoadedRequests = () => {
    return requests.map((request, i) => {
      const date = new Date(request.createdAt);
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
      let text = "";

      if (request.sender.gender === "man") {
        text = `عريس ${request.sender.username} - ${request.sender.phone} مع عروسة ${request.reciever.username}
        رقمها ${request.reciever.phone} ورقم ولي أمرها ${request.reciever.questions["15"]}`;
      } else {
        text = `عريس ${request.reciever.username} - ${request.reciever.phone} مع عروسة ${request.sender.username}
        رقمها ${request.sender.phone} ورقم ولي أمرها ${request.sender.questions["15"]}`;
      }

      return (
        <NeedContactRequest
          key={request._id}
          title={`${text}`}
          requestStatus={``}
          date={`${formattedDate}`}
        />
      );
    });
  };

  return (
    <>
      <Layout>
        <div
          dir={`rtl`}
          className="w-full mb-16  flex flex-col items-center justify-center overflow-hidden dark:text-light"
        >
          {/* {message && <div className="alert alert-warning">{message}</div>} */}
          <br/>
          {requests && showLoadedRequests()}
        </div>
      </Layout>
    </>
  );
};

export default UsersNeedContact;
