import { Message } from "../types";

const STORAGE_KEY = "chat_widget_messages";

// Save messages to session storage
export const saveMessages = (messages: Message[]): void => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Error saving messages to storage:", error);
  }
};

// Load messages from session storage
export const loadMessages = (): Message[] => {
  try {
    const storedMessages = sessionStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      return JSON.parse(storedMessages);
    }
  } catch (error) {
    console.error("Error loading messages from storage:", error);
  }
  return [];
};

// Clear messages from session storage
export const clearMessages = (): void => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing messages from storage:", error);
  }
};
