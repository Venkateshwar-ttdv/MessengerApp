import "./messages.css";
import React, { useEffect, useRef, useState } from "react";
import SendMessage from "./send-message.js";
import menu from "./images/Menu.png"
const Messages = ({ socket, userName, room ,active ,setActive}) => {
  const [messagesRecieved, setMessageRecieved] = useState([]);
  const messagesColumnRef = useRef(0);
  useEffect(() => {
    socket.on("last_100_messages", (data) => {
      data.reverse();
      setMessageRecieved((prev) => {
        const stringData = JSON.stringify([...data, ...prev]);
        sessionStorage.setItem("Refresh", stringData);
        return [...data, ...prev];
      });
    });
    return () => socket.off("last_100_messages");
  }, [socket]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRecieved((state) => {
        const put = {
          message: data.message,
          userName: data.userName,
          __createdtime__: data.__createdtime__,
        };

        const stringData = JSON.stringify([...state, put]);
        sessionStorage.setItem("Refresh", stringData);
        return [
          ...state,
          {
            message: data.message,
            userName: data.userName,
            __createdtime__: data.__createdtime__,
          },
        ];
      });
    });
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  useEffect(() => {
    const data = sessionStorage.getItem("Refresh");
    if (data) {
      const put = JSON.parse(data);
      setMessageRecieved(put);
    }
  }, []);

  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  const imgClick = () => {
    console.log(active);
    if(active === "active-menu") {
      setActive("");
    } else {
      setActive("active-menu");
    }
  }
  return (
    <div className="messagesColumn">
    <div className = "active" ><img className="img-active" onClick={imgClick} src = {menu} style = {{margin : "2px" ,height:"40px" ,width:"40px"}}/>
        <div className="active-room"> <div className="active-room-name">{room}</div> </div>
    </div>
      <div className="message-area" ref={messagesColumnRef}>
        {messagesRecieved.map((msg, i) => (
          <div className="message" key={i}>
            <div className="message-box">
              <div className="first-flex"><p className="first"> {msg.userName[0].toUpperCase()} </p></div>
              <div className="message-box-A">
                <p className="user-name"> {msg.userName} </p>
                <div className="user-message"> {msg.message} </div>
                <p className="user-time">
                  {" "}
                  {formatDateFromTimestamp(msg.__createdtime__).slice(
                    0,
                    10
                  )}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-input-area">
        {" "}
        <SendMessage socket={socket} userName={userName} room={room} />{" "}
      </div>
    </div>
  );
};

export default Messages;
