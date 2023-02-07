import React from "react";
import Message from "./Message/Message";
import ScrollToBottom from "react-scroll-to-bottom"
import './Messages.css'

function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="messagesContainer">
      {messages.map(message => {
        return (
          <Message key={message.text} message={message.text} user={message.from} name={name} />
        );
      })}
    </ScrollToBottom>
  );
}

export default Messages;
