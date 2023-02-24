import { UserRecord as UserType, Users } from '../../../../types/socket';
import { getImageUrl } from '../../../../utils';

export interface UserProps {
  userArr: [id: string, user: UserType];
  onClick: (user: Users) => void;
  isSelected: boolean;
}

const User = ({ userArr, onClick, isSelected }: UserProps) => {
  const [, { avatar, name, online }] = userArr;

  const onClickFunc = () => onClick(Object.fromEntries([userArr]));

  return (
    <button
      onClick={onClickFunc}
      type={'button'}
      className={`relative flex h-fit w-full flex-col items-center justify-evenly py-2 hover:bg-gray-100 active:bg-gray-200 md:h-24 md:flex-row ${
        isSelected ? 'bg-section' : ''
      }`}
    >
      <img
        src={getImageUrl(avatar)}
        className={'mx-4 h-16 w-16 rounded-md object-cover md:h-full md:w-20'}
        alt={''}
      />
      <div className={'w-40'}>
        <h4
          className={
            'truncate px-2 text-center font-semibold tracking-tight md:px-0 md:text-left'
          }
        >
          {name}
        </h4>
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
        <div
          className={
            'circle absolute top-[3.75rem] left-[6.4rem] z-10 h-4 w-4 bg-online md:left-[5.75rem] md:top-[4.75rem]'
          }
        >
          &nbsp;
        </div>
      )}
    </button>
  );
};

export default User;
