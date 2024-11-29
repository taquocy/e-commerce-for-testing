import { createContext, useState, useContext, useEffect } from 'react';
import { fetchChatMessages, sendChatMessage } from '../api';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchChatMessages();
      setMessages(fetchedMessages);
    };

    loadMessages();
  }, []);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const sendMessage = async (message) => {
    const sentMessage = await sendChatMessage(message);
    addMessage(sentMessage);
  };

  const values = {
    messages,
    sendMessage,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
