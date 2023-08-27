import React ,{useState} from "react";
import MessagesRecieved from "./messages.js";
import RoomAndUsers from "./room-and-users.js";
import "./chat.css";
const Chat = ({ socket, userName, room, setRoom, setUserName }) => {
  const [active ,setActive] = useState("");
  return (
    <div className="chatContainer">
        {
        <RoomAndUsers
          socket={socket}
          userName={userName}
          room={room}
          setRoom={setRoom}
          active = {active}
        />}
      <MessagesRecieved room = {room} active = {active} setActive = {setActive} socket={socket} userName={userName}/> 
    </div>
  );
};

export default Chat;
