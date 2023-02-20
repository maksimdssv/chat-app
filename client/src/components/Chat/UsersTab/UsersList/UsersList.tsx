import User, { UserProps } from './User';

interface UsersListProps {
  users: User[];
}

export type User = Omit<UserProps, 'onClick'> & { id: string };

const UsersList = ({ users }: UsersListProps) => {
  return (
    <div className={'h-full overflow-y-auto overflow-x-hidden'}>
      {users.map((user) => (
        <User
          key={user.id}
          onClick={() => {
            return;
          }}
          {...user}
        />
      ))}
    </div>
  );
};

export default UsersList;
