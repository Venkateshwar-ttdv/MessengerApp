import React, {useState } from "react";
import Home from "./home.js";
import {BrowserRouter ,Route ,Routes} from "react-router-dom";
import io from "socket.io-client";
import Chat from "./chat.js";
import "./app.css";


const socket = io.connect("https://messengerapp-i36v.onrender.com");
const App = () => {
    const [userName ,setUserName] = useState("");
    const [room ,setRoom] = useState("");

    return (
        <BrowserRouter>
            <div className = "App">
                <Routes>
                    <Route 
                        path = '/' 
                        element = {
                            <Home 
                                userName={userName} 
                                setUserName={setUserName}
                                room = {room}
                                setRoom = {setRoom}
                                socket = {socket} />
                        }
                    />
                    <Route 
                        path = "/chat"
                        element = {
                            <Chat 
                                userName = {userName} 
                                room = {room} 
                                socket = {socket} 
                                setUserName ={setUserName}
                                setRoom = {setRoom}
                                />
                        }
                        />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;