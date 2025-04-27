import React from "react";
import { MessageCircle } from "lucide-react";

interface ChatBubbleProps {
  onClick: () => void;
  hasUnread: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick, hasUnread }) => {
  return (
    <div
      className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-inherit text-inherit cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      onClick={onClick}
      aria-label="Open chat"
      style={{
        background: "var(--chat-primary-color, #3b82f6)",
        color: "var(--chat-text-color, white)",
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-20 duration-1000"
        style={{ background: "var(--chat-primary-color, #3b82f6)" }}
      ></div>
      <MessageCircle className="w-8 h-8 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />

      

      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div
          className="text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md"
          style={{
            background: "var(--chat-tooltip-bg, #1f2937)",
            color: "var(--chat-tooltip-text, white)",
          }}
        >
          Chat with us
          <div
            className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2"
            style={{ background: "var(--chat-tooltip-bg, #1f2937)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
