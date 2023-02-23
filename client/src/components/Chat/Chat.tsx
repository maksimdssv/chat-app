import UsersTab from './UsersTab/UsersTab';
import ChatBody from './ChatBody/ChatBody';
import { CREDENTIALS, socket } from '../../utils';
import { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('login', CREDENTIALS);
    });

    return () => {
      socket.off('connect');
    };
  }, []);
  return (
    <div className={'flex h-screen bg-main px-32 pt-8 pb-16'}>
      <ChatBody />
      <UsersTab />
    </div>
  );
};

export default Chat;
