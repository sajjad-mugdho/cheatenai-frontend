import { v4 as uuidv4 } from "uuid";

// Initialize state to store conversations
let conversations = [];

export const addMessageToConversation = (message) => {
  const { conversationId } = message;

  // Check if a conversation with the same ID exists
  const existingConversationIndex = conversations.findIndex(
    (conv) => conv.conversationId === conversationId
  );

  if (existingConversationIndex !== -1) {
    // Conversation exists, append new message
    conversations[existingConversationIndex].messages.push(message);
  } else {
    // Conversation does not exist, create a new conversation
    conversations.push({ conversationId, messages: [message] });
  }
};

export const getConversations = () => conversations;
