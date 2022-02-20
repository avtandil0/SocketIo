import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Alert } from "react-bootstrap";

import "./index.css";

function Login({ onPressLogin }) {
  const [user, setUser] = useState();

  const onPress = (e) => {
    e.preventDefault();
    onPressLogin(user);
  };
  return (
    <div className="login">
      <Form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 8,
          marginBottom: 7,
        }}
        onSubmit={onPress}
      >
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              placeholder="Nick Name"
              onChange={(e) => setUser(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </div>
        <div
          style={{
            marginLeft: 8,
            marginBottom: 7,
          }}
        >
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
