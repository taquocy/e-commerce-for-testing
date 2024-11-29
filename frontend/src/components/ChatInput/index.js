import React, { useState } from 'react';
import { Box, Input, Button, HStack } from '@chakra-ui/react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box p={4}>
      <HStack spacing={4}>
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </HStack>
    </Box>
  );
};

export default ChatInput;
