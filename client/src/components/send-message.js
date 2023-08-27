import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { IconButton} from "@mui/material";
import "./send-message.css";

const SendMessage = ({ socket, userName, room }) => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    console.log("h");
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { userName, room, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <>
      <input
        className="message-input"
        spellCheck="false"
        placeholder=" Message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></input>
      <IconButton onClick={sendMessage}>
        <div
          className="btn"
          style={{ height: "25px", width: "25px", borderRadius: "50%" }}
        >
          <SendIcon />
        </div>
      </IconButton>
    </>
  );
};

export default SendMessage;
