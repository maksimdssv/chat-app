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
    <div className={'flex h-screen flex-row bg-main md:py-8 md:px-16 lg:px-16 xl:px-32'}>
      <ChatBody />
      <UsersTab />
    </div>
  );
};

export default Chat;
