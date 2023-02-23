import User from './User';
import { Users } from '../../../../types/socket';

interface UsersListProps {
  users: Users;
}

const UsersList = ({ users }: UsersListProps) => {
  const entries = Object.entries(users);
  const usersIsEmpty = entries.length === 0;

  return (
    <div
      className={
        'h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-[#BECBD9] scrollbar-thumb-[#9DAAB9] scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-3'
      }
    >
      {entries.map((userArr) => {
        const [id] = userArr;
        return <User key={id} userArr={userArr} />;
      })}
      {usersIsEmpty && (
        <h3 className={'mt-5 text-center text-secondary'}>Nothing here for now...</h3>
      )}
    </div>
  );
};

export default UsersList;
