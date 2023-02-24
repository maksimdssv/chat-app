import { useEffect, useState } from 'react';
import UsersList from './UsersList/UsersList';
import {
  createFilterFunctionFilter,
  createFilterFunctionStatus,
  CREDENTIALS,
  filterUsers,
  socket,
} from '../../../utils';
import SectionButtonsContainer, {
  ButtonProps,
} from './SectionButtonsContainer/SectionButtonsContainer';
import { Users } from '../../../types';
import Loader from '../../common/Loader';
import Input from '../../common/Input';

enum Sections {
  'Online',
  'All',
}

export type SectionKey = keyof typeof Sections;

const BUTTONS: ButtonProps[] = [
  {
    position: 'left',
    text: 'Online',
  },
  {
    position: 'right',
    text: 'All',
  },
];

const UsersTab = () => {
  const [currentSection, setCurrentSection] = useState<SectionKey>('Online');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [users, setUsers] = useState<Users>({});

  // contacts event is listened here, because no other element uses list of users.
  // Handled our user in list by deleting his id from obj, thus saving the work of filtering it anywhere
  useEffect(() => {
    socket.on('contacts', (contacts: Users) => {
      delete contacts[CREDENTIALS.userId];
      setUsers(contacts);
      setIsLoading(false);
    });
    return () => {
      socket.off('contacts');
    };
  }, []);

  return (
    // Seperated as many elements to different components as I could to make code more readable and declarative.
    <section
      className={
        'flex w-40 flex-col justify-between overflow-hidden rounded-r-sm bg-white pb-6 md:w-72 '
      }
    >
      <SectionButtonsContainer
        onClick={setCurrentSection}
        active={currentSection}
        buttons={BUTTONS}
      />
      {!isLoading && (
        // filtering is done on frontend part, due to relative ease of it. Utilized functional programming by making filterUsers func
        <UsersList
          users={filterUsers(users, [
            createFilterFunctionStatus(currentSection),
            createFilterFunctionFilter(filter),
          ])}
        />
      )}
      <Loader isLoading={isLoading} label={'Loading...'} />
      <div className={'mt-4 px-4'}>
        <Input
          name={'name'}
          className={'outline outline-2 outline-gray-300'}
          placeholder={'Search...'}
          onChange={setFilter}
        />
      </div>
    </section>
  );
};

export default UsersTab;
