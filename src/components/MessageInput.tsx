import React, { useState, useRef } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message);
      setMessage("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ borderTop: "1px solid #2d2d2d", background: "#1a1a1a" }}
    >
      {isLoading && (
        <div
          className="h-0.5 w-full overflow-hidden"
          style={{ background: "#2d2d2d" }}
        >
          <div
            className="h-full animate-loadingBar"
            style={{ background: "var(--chat-primary-color)" }}
          ></div>
        </div>
      )}

      <div
        className="flex items-end m-2 rounded-lg pr-2"
        style={{ background: "#2d2d2d" }}
      >
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled ? "Currently offline..." : "Type your message..."
          }
          className="flex-1 border-none p-2 resize-none max-h-24 focus:outline-none text-sm placeholder-gray-400 text-white bg-transparent"
          rows={1}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!message.trim() || isLoading || disabled}
          className={`ml-1 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
            !message.trim() || isLoading || disabled
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "text-white hover:bg-opacity-80"
          }`}
          style={{
            background:
              !message.trim() || isLoading || disabled
                ? undefined
                : "var(--chat-primary-color)",
          }}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
