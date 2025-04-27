import React from "react";
import { Clock, Check, AlertCircle } from "lucide-react";
import { Message } from "../types";

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUserMessage = message.sender === "user";

  const statusIcon = () => {
    if (message.status === "sending")
      return <Clock className="w-3 h-3 text-gray-400" />;
    if (message.status === "sent")
      return <Check className="w-3 h-3 text-green-500" />;
    if (message.status === "error")
      return <AlertCircle className="w-3 h-3 text-red-500" />;
    return null;
  };

  return (
    <div
      className={`flex px-2 mb-2 ${
        isUserMessage ? "justify-end" : "justify-start"
      } animate-fadeIn`}
    >
      <div
        className={`max-w-[85%] rounded-lg px-3 py-1.5 ${
          isUserMessage ? "rounded-br-none" : "rounded-bl-none shadow-sm"
        }`}
        style={{
          background: isUserMessage
            ? "rgb(59, 59, 59)" // fallback to blue if not set
            : "var(--chat-message-bg,rgb(38, 38, 38))", // fallback for received messages
          color: "var(--chat-text-color, #ffffff)", // fallback white text
        }}
      >
        <div className="text-sm break-words">{message.content}</div>
        <div className="flex justify-end items-center gap-1 mt-0.5">
          <span className="text-[10px] opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isUserMessage && message.status && <span>{statusIcon()}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
