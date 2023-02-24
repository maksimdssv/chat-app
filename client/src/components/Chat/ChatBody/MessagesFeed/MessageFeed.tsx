import Message from './Message';
import { useContext, useEffect, useRef } from 'react';
import { CREDENTIALS } from '../../../../utils';
import UserContext from '../../../../context/User';
import { ChatRecord } from '../../../../types';

interface MessagesFeedProps {
  chat: ChatRecord;
  isTyping: boolean;
}

const getStatus = (name: string) => {
  if (name === CREDENTIALS.name) return 'sent';
  return 'received';
};

const MessagesFeed = ({ chat, isTyping }: MessagesFeedProps) => {
  const { currentUserId, currentUser } = useContext(UserContext);
  const { name } = currentUser[currentUserId];
  const ref = useRef<HTMLDivElement>(null);
  const messagesAmount = chat.messages.length;
  const getSeenAt = (index: number, length: number) => {
    if (index === length - 1 && chat.messages[length - 1].user === CREDENTIALS.name) {
      return chat.seenAt;
    }
    return '';
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [chat]);

  return (
    <>
      <div
        className={
          'mt-4 mr-2 flex h-full flex-col gap-y-6 overflow-y-auto px-8 overflow-x-hidden scrollbar-thin scrollbar-track-[#BECBD9] scrollbar-thumb-[#9DAAB9] scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-3'
        }
      >
        {chat.messages?.map((message, index) => (
          <Message
            key={index}
            {...message}
            status={getStatus(message.user)}
            seenAt={getSeenAt(index, messagesAmount)}
          />
        ))}
        <div ref={ref} className={'invisible'} />
      </div>
      <p
        className={`mx-auto mb-2 mt-1 inline-block select-none ${
          isTyping ? 'visible' : 'invisible'
        } bottom-4 animate-pulse self-end justify-self-end text-blue-400`}
      >
        {name} is typing...
      </p>
    </>
  );
};

export default MessagesFeed;
