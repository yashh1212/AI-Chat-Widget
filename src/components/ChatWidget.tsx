import React, { useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";
import { Message } from "../types";
import {
  initializeSocket,
  disconnectSocket,
  sendMessageToSocket,
} from "../services/socketService";
import { sendMessageToGemini } from "../services/geminiService";
import { saveMessages, loadMessages } from "../services/storageService";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedMessages = loadMessages();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }

    const connect = async () => {
      try {
        await initializeSocket(
          (message: Message) => {
            handleReceiveMessage(message);
          },
          () => {
            setIsConnected(true);
            setError(null);
          },
          () => {
            setIsConnected(false);
            setError("Connection lost. Trying to reconnect...");
          }
        );
      } catch (err) {
        setError("Failed to connect to chat server");
        setIsConnected(false);
      }
    };

    connect();

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: isOpen ? "WIDGET_RESIZE" : "WIDGET_CLOSE",
          data: {
            width: isOpen ? 384 : 64,
            height: isOpen ? 500 : 64,
          },
        },
        "*"
      );
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleReceiveMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: Date.now(),
      status: "sending",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      if (isConnected) {
        sendMessageToSocket(userMessage);
      }

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === userMessage.id ? { ...msg, status: "sent" } : msg
        )
      );

      setIsLoading(true);

      const response = await sendMessageToGemini(content);

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "ai",
        timestamp: Date.now(),
        status: "sent",
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (err) {
      console.error("Error sending message:", err);

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === userMessage.id ? { ...msg, status: "error" } : msg
        )
      );

      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-0 right-0 z-50"
      style={{
        backgroundColor: "#fffff", // grey dark background
        color: "#1a1a1a", // pure white text
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {isOpen ? (
        <ChatWindow
          messages={messages}
          onClose={toggleChat}
          onSendMessage={sendMessage}
          isLoading={isLoading}
          error={error}
          isConnected={isConnected}
        />
      ) : (
        <ChatBubble onClick={toggleChat} hasUnread={messages.length > 0} />
      )}
    </div>
  );
};

export default ChatWidget;
