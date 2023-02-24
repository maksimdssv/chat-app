import { createContext, useState } from 'react';
import { Users } from '../types';

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

// This context was created to give access to selected user to different parts of chat
export const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = useState<Users>({});
  const currentUserId = Object.keys(currentUser)[0];

  const value: UserContext = {
    currentUser,
    setCurrentUser,
    currentUserId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
