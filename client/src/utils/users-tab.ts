import { Users, UserRecord } from '../types/socket';
import { SectionKey } from '../components/Chat/UsersTab/UsersTab';

export const filterUsers = (
  usersObj: Users,
  filters: ((user: UserRecord) => boolean)[],
) => {
  const users = Object.entries(usersObj);
  const filteredUsers = users.filter(([, user]) => {
    for (const filter of filters) {
      if (!filter(user)) return false;
    }
    return true;
  });
  return Object.fromEntries(filteredUsers);
};

export function createFilterFunctionStatus(status: SectionKey) {
  return (user: UserRecord) => (status === 'Online' ? user.online : true);
}

export function createFilterFunctionFilter(filter: string) {
  return (user: UserRecord) =>
    filter ? user.name.toLowerCase().includes(filter.toLowerCase()) : true;
}
