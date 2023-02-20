import Header from './Header';
import MessagesFeed from './MessagesFeed/MessageFeed';
import MessageForm from './MessageForm/MessageForm';
import { useState } from 'react';
import { MessageType } from './MessagesFeed/Message';

const MESSAGES = [
  {
    name: 'Reverse bot',
    text: 'Hello world!',
    date: '4:20 PM',
  },
  {
    name: 'Username',
    text: 'Hello robot',
    date: '4:22 PM',
  },
  {
    name: 'Reverse bot',
    text: 'Hello world!',
    date: '4:20 PM',
  },
  {
    name: 'Username',
    text: 'Hello robot',
    date: '4:22 PM',
  },
  {
    name: 'Reverse bot',
    text: 'Hello world!',
    date: '4:20 PM',
  },
  {
    name: 'Username',
    text: 'Hello robot',
    date: '4:22 PM',
  },
];
const ChatBody = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const sendMessage = (text: string) => {
    const newMessage = {
      text,
      name: 'Username',
      date: '4:40 PM',
    };
    setMessages((oldMessages) => [...oldMessages, newMessage]);
  };

  return (
    <div
      className={'flex flex-1 flex-col overflow-hidden rounded-l-sm bg-chat-body pb-6'}
    >
      <Header name={'Reverse bot'} avatar={'reverse_bot'} />
      <MessagesFeed messages={messages} />
      <MessageForm onSubmit={sendMessage} />
    </div>
  );
};

export default ChatBody;
