import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import { fetchChatMessages, sendChatMessage } from '../../api';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchChatMessages();
      setMessages(fetchedMessages);
    };

    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const sentMessage = await sendChatMessage(newMessage);
    setMessages([...messages, sentMessage]);
    setNewMessage('');
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Box borderWidth="1px" borderRadius="lg" p={4} overflowY="auto" maxHeight="400px">
          {messages.map((message, index) => (
            <HStack key={index} spacing={4} align="start">
              <Text>{message}</Text>
            </HStack>
          ))}
        </Box>
        <HStack spacing={4}>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Chat;
