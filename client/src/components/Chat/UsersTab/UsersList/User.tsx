export interface UserProps {
  onClick: () => void;
  name: string;
  avatar: string;
  online: boolean;
}

const User = ({ online, onClick, avatar, name }: UserProps) => {
  return (
    <button
      onClick={() => onClick()}
      className={`relative flex h-24 w-full max-w-full flex-col-reverse py-2 hover:bg-gray-100 active:bg-gray-200 md:flex-row`}
    >
      <img
        src={`src/public/${avatar}.jpg`}
        className={'mx-4 h-full rounded-md object-fill md:w-20'}
      />
      <div className={'flex flex-col'}>
        <h3 className={'break-words text-left font-semibold tracking-tight'}>{name}</h3>
        <p
          className={
            'hidden text-left leading-5 tracking-tight text-secondary md:line-clamp-2'
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, atque autem
          consectetur doloremque eos eveniet itaque natus nihil odit, provident quidem
          quisquam recusandae repellat sed similique sit tempore. Earum, est?
        </p>
      </div>
      {online && (
        <div className={'circle absolute left-20 bottom-1 z-10 h-4 w-4 bg-online'}>
          &nbsp;
        </div>
      )}
    </button>
  );
};

export default User;
