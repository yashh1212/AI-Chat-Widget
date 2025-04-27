import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Message } from "../types";

interface ChatWindowProps {
  messages: Message[];
  onClose: () => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onClose,
  onSendMessage,
  isLoading,
  error,
  isConnected,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add("animate-slideIn");
    }
  }, []);

  const handleClose = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove("animate-slideIn");
      containerRef.current.classList.add("animate-slideOut");
      setTimeout(onClose, 300);
    } else {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-96 h-[500px] rounded-lg shadow-2xl overflow-hidden transform origin-bottom-right"
      style={{
        background: "var(--chat-window-bg,rgb(49, 49, 49))",
        color: "#ffffff", // force all text to white
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between h-12 px-3"
        style={{
          background: "var(--chat-primary-color, #3b82f6)",
          color: "#ffffff", // force white
        }}
      >
        <div className="flex items-center">
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">Chat Support</h3>
            <span className="text-xs opacity-75">
              {isConnected ? "Connected" : "Connected"}
            </span>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-opacity-80"
          style={{
            background: "var(--chat-primary-hover, #2563eb)",
            color: "#ffffff", // force white
          }}
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          className="px-2 py-1 text-xs text-center"
          style={{
            background: "var(--chat-error-bg, #dc2626)",
            color: "#ffffff", // force white
          }}
        >
          {error}
        </div>
      )}

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        disabled={!isConnected && !navigator.onLine}
      />
    </div>
  );
};

export default ChatWindow;
