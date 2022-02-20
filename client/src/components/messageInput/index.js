import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button, FloatingLabel, Form, Alert } from "react-bootstrap";
import Messages from "../messages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function MessageInput({handleChangeMessage,message, sendMessage, userTypeOption}) {
  return (
    <div style={{ height: 200 }}>
      <div style={{ marginBottom: 5 }}>
        {userTypeOption ? "user typing..." : ""}
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "87%", height: 100 }}>
          <div>
            <FloatingLabel controlId="floatingTextarea2" label="Message">
              <Form.Control
                as="textarea"
                placeholder="type message ..."
                style={{ height: "100px" }}
                value={message}
                onChange={handleChangeMessage}
              />
            </FloatingLabel>
          </div>
        </div>

        <div style={{ marginLeft: 10, width: "10%" }}>
          <Button
            onClick={sendMessage}
            style={{ width: "100%", height: "100px" }}
          >
            Send{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
