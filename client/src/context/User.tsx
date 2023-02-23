import { createContext, useState } from 'react';
import { Users } from '../types/socket';
import { getSetState } from '../utils';

const UserContext = createContext<UserContext>({
  currentUserId: '',
  currentUser: {},
  setCurrentUser(): void {
    return;
  },
});

interface UserContext {
  currentUserId: string;
  setCurrentUser: (user: Users) => void;
  currentUser: Users;
}

export const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = useState<Users>({});
  const currentUserId = Object.keys(currentUser)[0];

  const value: UserContext = {
    currentUser,
    setCurrentUser: getSetState<Users>(setCurrentUser),
    currentUserId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
