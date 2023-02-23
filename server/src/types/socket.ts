import { BOTS } from '../utils';

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  contacts: (contacts: object[]) => void;
}

export interface ClientToServerEvents {
  login: (userCreds: object) => void;
}

export type Users = Record<string, UserRecord>;

export interface UserRecord {
  name: string;
  avatar: string;
  online: boolean;
  chats: { [key: string]: string };
}

export type Chats = Record<string, ChatRecord>;

export interface ChatRecord {
  messages: Message[];
  seenAt: string;
}

export interface Message {
  text: string;
  date: string;
  user: string;
}

export type ReceivedMessage = Omit<Message, 'date'>;

export interface ReceivedUserCredentials {
  name: string;
  userId: string;
  avatar: string;
}

export type BotsType = keyof typeof BOTS;