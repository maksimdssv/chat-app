import { io } from 'socket.io-client';
import {
  adjectives,
  animals,
  colors,
  NumberDictionary,
  uniqueNamesGenerator,
} from 'unique-names-generator';

const AVATARS = ['patrick', 'spongebob', 'squidward', 'krabs', 'plankton'];

// export const socket = io('http://localhost:3000');
/*export const getCredentials = () => {
  const name = getField('name', generateName);
  const userId = getField('userId', generateUserId);
  const avatar = getField('avatar', generateAvatar);
  return { name, userId, avatar };
};*/

const getField = (fieldName: string, fallback: () => string) => {
  const value = localStorage.getItem(fieldName);
  if (!value) {
    const newValue = fallback();
    localStorage.setItem(fieldName, newValue);
    return newValue;
  }
  return value;
};
const generateName = () => {
  const numberDictionary = NumberDictionary.generate({ min: 1000, max: 9999 });
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals, numberDictionary],
    style: 'capital',
  });
};
const generateUserId = () => {
  return window.crypto.randomUUID();
};
const generateAvatar = () => {
  return AVATARS[Math.round(Math.random() * AVATARS.length)];
};

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export const CREDENTIALS = {
  name: getField('name', generateName),
  userId: getField('userId', generateUserId),
  avatar: getField('avatar', generateAvatar),
};
