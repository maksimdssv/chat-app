import { useContext } from 'react';
import UserContext from '../../../../context/User';
import { UserRecord as UserType } from '../../../../types/socket';

export interface UserProps {
  userArr: [id: string, user: UserType];
}

const User = ({ userArr }: UserProps) => {
  const [id, { avatar, name, online }] = userArr;
  const { currentUserId, setCurrentUser } = useContext(UserContext);

  const onClickFunc = () => setCurrentUser(Object.fromEntries([userArr]));

  return (
    <div className={''}>
      <button
        onClick={onClickFunc}
        className={`relative flex h-24 w-full flex-col-reverse py-2 hover:bg-gray-100 active:bg-gray-200 md:flex-row ${
          currentUserId === id ? 'bg-section' : ''
        }`}
      >
        <img
          src={`src/public/${avatar}.jpg`}
          className={'mx-4 h-full rounded-md object-fill md:w-20'}
          alt={''}
        />
        <div className={'flex flex-col'}>
          <h4 className={'truncate text-left font-semibold tracking-tight'}>{name}</h4>
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
            className={'circle absolute left-[5.25rem] bottom-1 z-10 h-4 w-4 bg-online'}
          >
            &nbsp;
          </div>
        )}
      </button>
    </div>
  );
};

export default User;
