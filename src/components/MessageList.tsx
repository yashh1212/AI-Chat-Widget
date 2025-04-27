import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { Message } from "../types";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showWelcomeMessage = messages.length === 0;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "#111111" }}>
      {showWelcomeMessage ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-3">
          <div className="w-12 h-12 mb-3 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-xl">👋</span>
          </div>
          <h3
            className="text-base font-medium mb-1 text-white"
            style={{ color: "var(--chat-text-color, #ffffff)" }}
          >
            Welcome to our chat!
          </h3>
          <p
            className="text-sm text-gray-400"
            style={{ color: "var(--chat-message-text, #d1d5db)" }}
          >
            How can we help you today?
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
