import React from "react";
import { Message } from "../types/chat";

export const GptMessage: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="">
      <p>
        <b>GPT</b>
      </p>
      <p>{message.content}</p>
    </div>
  );
};

export const UserMessage: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="user-message">
      <p>
        <b>User</b>
      </p>
      <p>{message.content}</p>
    </div>
  );
};

export const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  return message.from === "ai" ? (
    <GptMessage message={message} />
  ) : (
    <UserMessage message={message} />
  );
};
