import React, { useEffect, useState } from "react";


function Messages({ messages }) {

  console.log('messages', messages)

  if (!messages?.length) {
    return <div>No messages</div>;
  }

  return (
    <div>
      {messages.map((obj) => (
        <li key={obj.message}>{obj.user} - {obj.message}</li>
      ))}
    </div>
  );
}

export default Messages;
