import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "./room-and-user.css";

const RoomAndUsers = ({socket ,userName ,room ,setRoom ,active}) => {
    
    const [roomUsers ,setRoomUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("chatroom_users" ,(data) => {
            sessionStorage.setItem("userList" ,JSON.stringify([...data]));
            console.log("data ",data);
            if(data.length) {
                sessionStorage.setItem("room" ,data[0].room);
                setRoomUsers([...data]);
            }
        })

        return () => socket.off("chatroom_users");
    } ,[socket])
    
    useEffect(() => {
        if(sessionStorage.getItem("userList")) {
            setRoomUsers(JSON.parse(sessionStorage.getItem("userList")));
            setRoom(sessionStorage.getItem("room"));
        }
    } ,[]);
    const leaveRoom = () => {
        const __createtime__ = Date.now();
        sessionStorage.clear();
        socket.emit("leave_room" ,{userName ,room ,__createtime__});
        navigate("/" ,{replace : true})
    }
    return (
        <div className = {`roomAndUsersColumn ${active}`}>
        <div className = "button-room">
            <button className = "btn-room" onClick = {leaveRoom} variant="outlined"> <span style = {{padding : "8px 10px"}}> Leave Room </span> </button>
        </div>
            <h2 className = "room-title"> {room} </h2>
            {roomUsers.length > 0 && <h3 className = "user-title"> Users </h3>}
            <div className = "user-list">
                {roomUsers.map((user ,i) => <h4 className = "room-element" key = {i}>
                    <p className = "first" style = {{marginTop:"0"}}> {user.userName[0].toUpperCase()}</p>
                    <p className = "second"> {user.userName} </p> </h4>)}
            </div>
        </div>
    );
}

export default RoomAndUsers;