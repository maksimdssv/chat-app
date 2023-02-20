import Message, { MessageType } from './Message';
import { useEffect, useRef } from 'react';

interface MessagesFeedProps {
  messages: MessageType[];
}

const MessagesFeed = ({ messages }: MessagesFeedProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const getStatus = (name: string) => {
    if (name === 'Username') return 'sent';
    return 'received';
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  return (
    <div
      className={
        'my-4 mr-2 flex h-full flex-col gap-y-6 overflow-y-auto px-8 py-4 overflow-x-hidden scrollbar-thin scrollbar-track-[#BECBD9] scrollbar-thumb-[#9DAAB9] scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-3'
      }
    >
      {messages.map((message, index) => (
        <Message key={index} {...message} status={getStatus(message.name)} />
      ))}
      <div ref={ref} className={'invisible'} />
    </div>
  );
};

export default MessagesFeed;
