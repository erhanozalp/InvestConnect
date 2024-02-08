import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import userAvatar from '../assets/user1.png'; 

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Merhaba! iş teklifi mi değerlendirir misiniz?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Demo Match',
          avatar: userAvatar, 
        },
      },
      {
        _id: 2,
        text: 'Merhaba',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Ben',
          avatar: userAvatar, 
        },
      },
     
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: 1,
        avatar: userAvatar, 
      }}
    />
  );
};

export default ChatScreen;
