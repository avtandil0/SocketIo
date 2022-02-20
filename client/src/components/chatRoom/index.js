import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, FloatingLabel, Form, Alert } from "react-bootstrap";
import Messages from "../messages";
import MessageInput from "../messageInput";
import Users from "../users";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function ChatRoom({ socket, user }) {
  const [message, setMessage] = useState("");
  const [userTypeOption, setUerTypeOption] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const [chatMessages, setChatMessages] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    socket?.on("chat message", function (msg) {
      setChatMessages((prev) => [...prev, msg]);
    });

    socket?.on("someone connect", function (user) {
      console.log('user login', user)
      setUsers((prev) => [...prev, user])
      setAlertContent(`new user "${user.name}" connect the chat`);
      setAlertVariant("success");
      setAlertShow(true);
      setTimeout(() => {
        setAlertShow(false);
      }, 3000);
    });

    socket?.on("someone disconnect", function (user) {
      setAlertContent(`user disconnect the chat`);
      setAlertVariant("danger");
      setAlertShow(true);
      setTimeout(() => {
        setAlertShow(false);
      }, 3000);
    });

    socket?.on("user typing", function (value) {
      setUerTypeOption(value);
    });

   

  }, [socket]);

  const sendMessage = () => {
    socket.emit("chat message", { user: user, message: message });
    setMessage("");
    socket.emit("user typing", false);
  };

  const handleChangeMessage = (e) => {
    if (e.target.value) {
      console.log("if", e.target.value);
      socket.emit("user typing", true);
      //   setUerTypeOption(true);
    } else {
      setUerTypeOption(false);
      socket.emit("user typing", false);
    }

    setMessage(e.target.value);
  };

  const onPressLogin = (user) => {
    console.log("user", user);
  };
  return (
    <div className="chatRoom">
      <div className="chat">
        <div style={{ height: 40 }}>
          {alertShow ? (
            <Alert variant={alertVariant}> {alertContent}</Alert>
          ) : null}
        </div>
        <div className="chat">
          <div>
            <h2>{user}</h2>
            <Messages messages={chatMessages} />
          </div>
          <div style={{ height: 200 }}>
            <MessageInput
              handleChangeMessage={handleChangeMessage}
              message={message}
              sendMessage={sendMessage}
              userTypeOption={userTypeOption}
            />
          </div>{" "}
        </div>
      </div>
      <div className="users">
        <Users users={users}/>
      </div>
    </div>

  );
}

export default ChatRoom;
