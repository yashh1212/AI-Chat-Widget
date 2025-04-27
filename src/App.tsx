import React, { useEffect } from "react";
import ChatWidget from "./components/ChatWidget";

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const primaryColor = params.get("primaryColor") || "#1a1a1a";
    const textColor = params.get("textColor") || "#ffffff";
    const accentColor = params.get("accentColor") || "#ef4444";

    document.documentElement.style.setProperty(
      "--chat-primary-color",
      primaryColor
    );
    document.documentElement.style.setProperty("--chat-text-color", textColor);
    document.documentElement.style.setProperty(
      "--chat-accent-color",
      accentColor
    );
    document.documentElement.style.setProperty(
      "--chat-primary-hover",
      adjustColor(primaryColor, 20)
    );
    document.documentElement.style.setProperty("--chat-window-bg", "#1a1a1a");
    document.documentElement.style.setProperty("--chat-tooltip-bg", "#374151");
    document.documentElement.style.setProperty(
      "--chat-tooltip-text",
      "#ffffff"
    );
    document.documentElement.style.setProperty("--chat-error-bg", "#7f1d1d");
    document.documentElement.style.setProperty("--chat-error-text", "#fecaca");
    document.documentElement.style.setProperty("--chat-message-bg", "#2d2d2d");
    document.documentElement.style.setProperty(
      "--chat-message-text",
      "#e5e7eb"
    );
  }, []);

  return (
    <div className="h-screen w-screen ">
      
      <ChatWidget />
    </div>
  );
}

function adjustColor(color: string, amount: number): string {
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;

  r = Math.min(Math.max(0, r), 255);
  g = Math.min(Math.max(0, g), 255);
  b = Math.min(Math.max(0, b), 255);

  return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
}

export default App;
