import Header from './Header';
import MessagesFeed from './MessagesFeed/MessageFeed';
import MessageForm from './MessageForm/MessageForm';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CREDENTIALS, getSetState, socket } from '../../../utils';
import UserContext from '../../../context/User';
import { bots, ChatRecord, Message } from '../../../types/socket';
import Loader from '../../common/Loader';

const defaultValueChat: ChatRecord = {
  messages: [],
  seenAt: '',
};

function notifyOfTyping(timeout: NodeJS.Timeout | undefined, chatId: string | undefined) {
  return () => {
    clearTimeout(timeout);
    socket.emit('typing', chatId);
    timeout = setTimeout(() => {
      socket.emit('stop-typing', chatId);
    }, 3000);
  };
}

function notifySeenAt(chatId: string) {
  socket.emit('seen', chatId);
}

const ChatBody = () => {
  const { currentUser, currentUserId } = useContext(UserContext);
  const { name, avatar } = currentUser[currentUserId] || CREDENTIALS;
  const { userId } = CREDENTIALS;
  const [chat, setChat] = useState<ChatRecord>(defaultValueChat);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatIdRef = useRef<string>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const dataIsLoaded = currentUserId !== '' && !isLoading;

  const sendMessage = (text: string) => {
    const msgEvent = currentUserId in bots ? 'bots' : 'message';
    const newMessage = {
      text,
      user: CREDENTIALS.name,
    };
    socket.emit(msgEvent, newMessage, chatIdRef.current, currentUserId);
  };

  const loadChat = useCallback(function loadChat(chat: ChatRecord, roomId: string) {
    setChat(chat);
    const messagesAmount = chat.messages.length;
    chatIdRef.current = roomId;
    if (!chat.seenAt && messagesAmount > 0) {
      checkMessage(chat.messages[messagesAmount - 1]);
    }
    setIsLoading(false);
  }, []);

  function setSeenAt(date: string) {
    setChat((oldChat): ChatRecord => ({ messages: [...oldChat.messages], seenAt: date }));
  }

  const receiveMessage = useCallback(function receiveMessage(message: Message) {
    checkMessage(message);
    setChat(
      (oldChat): ChatRecord => ({ messages: [...oldChat.messages, message], seenAt: '' }),
    );
  }, []);

  function checkMessage(message: Message) {
    if (message.user !== CREDENTIALS.name && chatIdRef.current) {
      notifySeenAt(chatIdRef.current);
    }
  }

  useEffect(() => {
    if (currentUserId) socket.emit('join-chat', userId, currentUserId, loadChat);
  }, [userId, currentUserId, loadChat]);

  useEffect(() => {
    socket.on('message', receiveMessage);
    socket.on('typing', getSetState<boolean>(setIsTyping));
    socket.on('seen', setSeenAt);
    return () => {
      socket.off('message');
      socket.off('typing');
      socket.off('seen');
    };
  }, [receiveMessage]);

  return (
    <div
      className={'flex flex-1 flex-col overflow-hidden rounded-l-sm bg-chat-body pb-6'}
    >
      <Header name={name} avatar={avatar} />
      {dataIsLoaded && (
        <>
          <MessagesFeed chat={chat} isTyping={isTyping} />
          <MessageForm
            onSubmit={sendMessage}
            onChange={notifyOfTyping(timeoutRef.current, chatIdRef.current)}
          />
        </>
      )}
      {!currentUserId && (
        <h3 className={'mx-auto mt-10 text-secondary'}>
          Select a user to start chatting!
        </h3>
      )}
      {currentUserId && (
        <Loader isLoading={isLoading} label={'Loading...'} className={'mt-10'} />
      )}
    </div>
  );
};

export default ChatBody;
