import React, { useEffect, useState } from "react";
import "./index.css";

function Users({ users }) {
    console.log('userssss', users)
    if (!users?.length) {
        return <div className="userList">You are alone :)</div>;
    }
    return (
        <div className="userList">
            eee
            {users.map((obj) => (
                <li key={obj.id}>{obj.name} </li>
            ))}
        </div>);
}

export default Users;
