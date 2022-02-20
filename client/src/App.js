import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, FloatingLabel, Form, Alert } from "react-bootstrap";
import ChatRoom from "./components/chatRoom";
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const newSocket = io(`http://localhost:3030`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const onPressLogin = (user) => {
    console.log("user", user);
    setUser(user)
    socket.emit("login", user);
    setAuthorized(true);
  };
  return (
    <div className="app">
      {authorized ? <ChatRoom socket={socket} user={user}/> : <Login onPressLogin={onPressLogin} />}
    </div>
  );
}

export default App;
