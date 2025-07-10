import React from "react";
import { RiChatVoiceAiLine } from "react-icons/ri";

function ChatMessage({ chat }) {
  return (
    <>
      <div
        className={`message ${
          chat.role === "model" ? "bot-message" : "user-message"
        }`}
      >
        {chat.role === "model" && <RiChatVoiceAiLine />}
        <p className="message-text">{chat.text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
