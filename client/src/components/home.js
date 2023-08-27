import React, {useState } from "react";
import logo from "./images/logo.png";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Dialog,
} from "@mui/material";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Info from "./Alert";

const Home = ({ userName, setUserName, room, setRoom, socket }) => {
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", { userName, room });
      navigate("/chat", { replace: true });
    } else {
      setAlert(true);
      setTimeout(() => setAlert(false), 2500);
    }
  };

  return (
      <div className="container">
        <div className="logo-image">
          <img className = "image" src={logo} alt="chat logo" />
          <h2> Connecting people </h2>
        </div>
        <div className="form-box">
            <img className="responsive-logo" src = {logo} style = {{height:"80px" ,marginBottom : "40px"}} />
            <div className="formContainer">
              <h1>
                {" "}
                Welcome <span className="name-span"> {userName} </span>{" "}
              </h1>
              <TextField
                 style = {{width : "250px" ,height : "55.98"}}
                value={userName}
                onChange={(e) => {
                  if (e.target.value.length < 13) setUserName(e.target.value);
                }}
                spellCheck="false"
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
              <FormControl style = {{width : "250px" ,height : "55.98"}}>
                <InputLabel> Select Room </InputLabel>
                <Select
                  label="Select room"
                  onChange={(e) => setRoom(e.target.value)}
                  value={room}
                >
                  <MenuItem value="Phoenix"> Phoenix </MenuItem>
                  <MenuItem value="My family"> My family </MenuItem>
                  <MenuItem value="Tech Ninjas"> Tech Ninjas </MenuItem>
                  <MenuItem value="Code hash"> Code hash </MenuItem>
                </Select>
              </FormControl>
              <Button
                onClick={joinRoom}
                className="btn btn-secondary"
                variant="outlined"
              >
                {" "}
                Join Room{" "}
              </Button>
              
            </div>
            {!alert ? <div className = "alert" style = {{border : "1px solid white"}}>  </div> : <Info />}
        </div>
      </div>
  );
};

export default Home;
