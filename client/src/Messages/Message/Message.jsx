import React from "react";
import "./Message.css";

let isFound;
function Message({ message, user, name }) {
  let text = message;
  if (user === name) {
    return (
      <div className="messageContainer">
        <div className="whiteBg">
          <p className="whiteUser">{user}</p>
          <div className="whiteMessage">{message}</div>
        </div>
      </div>
    );
  }
  isFound = text.search(/\bchat/);

  if (message === "Welcome to the chat" || isFound > 0) {
    return (
      <div className="messageContainer">
        <div className="blueBg">
          <p className="blueUser">{user}</p>
          <div className="blueMessage" style={{ fontSize: "13px" }}>
            {message}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="messageContainer">
        <div className="blueBg">
          <p className="blueUser">{user}</p>
          <div className="blueMessage">{message}</div>
        </div>
      </div>
    );
  }
}

export default Message;
