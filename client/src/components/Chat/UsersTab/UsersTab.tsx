import SectionButton, { SectionButtonProps } from './SectionButton';
import { ChangeEvent, useState } from 'react';
import UsersList, { User } from './UsersList/UsersList';

enum Sections {
  'Online',
  'All',
}

export type SectionKey = keyof typeof Sections;

const BUTTONS: Pick<SectionButtonProps, 'text' | 'position'>[] = [
  {
    position: 'left',
    text: 'Online',
  },
  {
    position: 'right',
    text: 'All',
  },
];

const USERS: User[] = [
  {
    id: '1',
    name: 'Reverse bot',
    online: true,
    avatar: 'patrick',
  },
  {
    id: '1',
    name: 'Reverse bot',
    online: false,
    avatar: 'reverse_bot',
  },
];

const UsersTab = () => {
  const [currentSection, setCurrentSection] = useState<SectionKey>('Online');
  const [filter, setFilter] = useState<string>();
  const [users, setUsers] = useState<User[]>(USERS);
  const switchSection = (section: SectionKey) => {
    setCurrentSection(section);
  };

  const changeFilter = (evt: ChangeEvent<HTMLInputElement>) => {
    setFilter(evt.target.value);
  };

  const filterUsers = () => {
    return users.filter((user) => {
      let filtered = true;
      if (filter) {
        filtered = user.name.toLowerCase().includes(filter.toLowerCase());
      }
      if (currentSection === 'Online') {
        filtered = user.online;
      }
      return filtered;
    });
  };

  return (
    <section
      className={'flex w-40 flex-col overflow-hidden rounded-r-sm bg-white pb-6 md:w-72'}
    >
      <div className={'flex'}>
        {BUTTONS.map((button, index) => (
          <SectionButton
            key={index}
            position={button.position}
            text={button.text}
            action={switchSection}
            active={currentSection}
          />
        ))}
      </div>
      <UsersList users={filterUsers()} />
      <div className={'px-4'}>
        <input
          name={'name'}
          className={
            'w-full rounded-lg py-2 px-4 outline outline-2 outline-gray-300 focus:shadow-sm focus:shadow-blue-500 focus:outline-blue-500'
          }
          placeholder={'Search...'}
          onChange={changeFilter}
        />
      </div>
    </section>
  );
};

export default UsersTab;
