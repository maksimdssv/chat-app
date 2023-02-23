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

export enum bots {
  'echo',
  'reverse',
  'spam',
  'ignore',
}
