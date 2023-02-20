export interface MessageProps {
  name: string;
  date: string;
  text: string;
  status: 'received' | 'sent';
}

export type MessageType = Omit<MessageProps, 'status'>;

const colors = {
  received: 'bg-message-received',
  sent: 'bg-message-sent',
};

const positions = {
  received: 'self-start',
  sent: 'self-end',
};

const clipperPositions = {
  sent: 'right-[-25px] rotate-90',
  received: 'left-[-25px] rotate-[-90deg]',
};

const Message = ({ name, status, text, date }: MessageProps) => {
  return (
    <div
      className={`relative flex w-3/4 max-w-6xl flex-col rounded-xl bg-white ${positions[status]} shadow-lg`}
    >
      <h4 className={`${colors[status]} rounded-t-xl py-2 pl-4`}>{name}</h4>
      <p className={'break-all px-4 pt-2 pb-3 text-lg font-semibold'}>{text}</p>
      <p className={'absolute right-4 top-3 text-date'}>{date}</p>
      <div
        className={`triangle absolute  top-12 h-8 w-6 bg-inherit text-transparent ${clipperPositions[status]} shadow-xl`}
      >
        &nbsp;
      </div>
    </div>
  );
};

export default Message;
