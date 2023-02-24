import { io } from 'socket.io-client';
import {
  adjectives,
  animals,
  colors,
  NumberDictionary,
  uniqueNamesGenerator,
} from 'unique-names-generator';

export * from './users-tab';

const AVATARS = ['patrick', 'spongebob', 'squidward', 'krabs', 'plankton'];

export function getImageUrl(name: string) {
  return new URL(`/src/public/${name}.jpg`, import.meta.url).href;
}

// socket was exported to utils because there is no need of setting it up more than once
export const socket = io('http://localhost:3000');

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
  return AVATARS[Math.round(Math.random() * (AVATARS.length - 1))];
};

// Credentials are const in utils because they are not meant to be changed or set in any of components
export const CREDENTIALS = {
  name: getField('name', generateName),
  userId: getField('userId', generateUserId),
  avatar: getField('avatar', generateAvatar),
};
