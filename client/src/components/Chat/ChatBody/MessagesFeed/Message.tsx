import { Message as MessageType } from '../../../../types/socket';

export interface MessageProps extends MessageType {
  status: 'received' | 'sent';
  seenAt: string;
}

const colors = {
  received: 'bg-message-received',
  sent: 'bg-message-sent',
};

const positions = {
  received: 'self-start',
  sent: 'self-end',
};

const clipperPositions = {
  sent: 'right-[-1.6rem] rotate-90',
  received: 'left-[-1.6rem] rotate-[-90deg]',
};

const Message = ({ user, status, text, date, seenAt }: MessageProps) => {
  return (
    <div
      className={`relative flex w-3/4 max-w-6xl flex-col rounded-xl bg-white ${positions[status]} shadow-lg`}
    >
      <h4 className={`${colors[status]} rounded-t-xl py-2 pl-4`}>{user}</h4>
      <p className={'break-all px-4 pt-2 pb-3 text-lg font-semibold'}>{text}</p>
      <p className={'absolute right-4 top-3 text-date'}>{date}</p>
      <div
        className={`triangle absolute top-12 h-8 w-6 bg-inherit text-transparent ${clipperPositions[status]}`}
      >
        &nbsp;
      </div>
      {seenAt && (
        <p className={'absolute bottom-[-1.75rem] left-4 text-secondary'}>
          Seen at {seenAt}
        </p>
      )}
    </div>
  );
};

export default Message;
