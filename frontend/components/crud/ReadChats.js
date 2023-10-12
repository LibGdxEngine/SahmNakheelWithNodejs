import { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { listChats } from "../../actions/chats";
import { useRouter } from "next/router";
import RequestItem from "../../helpers/RequestItem";

const ReadChats = ({ username }) => {
  const router = useRouter();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = () => {
    listChats().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setChats(data.data);
      }
    });
  };

  const showLoadedChats = () => {
    return chats.map((chat, i) => {
      // const info = `Written by ${blog.postedBy.name} | Published on ${" "}
      //   ${moment(blog.updatedAt).fromNow()}`;
      const date = new Date(chat.createdAt);
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
      return (
        <RequestItem
          key={chat._id}
          title={`محادثة جارية بين ${chat.sender?.username} وبين ${chat.reciever?.username}`}
          requestStatus={``}
          date={`${formattedDate}`}
          link={`/questions/${chat._id}-${chat.sender?.username}-${chat.reciever?.username}`}
        />
      );
    });
  };

  return (
    <>
      <div
        dir={`rtl`}
        className="w-full mb-16  flex flex-col items-center justify-center overflow-hidden dark:text-light"
      >
        {/* {message && <div className="alert alert-warning">{message}</div>} */}
        {showLoadedChats()}
      </div>
    </>
  );
};

export default ReadChats;
