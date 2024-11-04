import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ChatMessage = ({ message }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={2}>
      <Text>{message}</Text>
    </Box>
  );
};

export default ChatMessage;
