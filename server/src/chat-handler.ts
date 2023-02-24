import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { BOTS } from './utils';
import { Chats, Message, ReceivedUserCredentials, Users } from './types/socket';
import { v4 as uuidv4 } from 'uuid';

export default class ChatHandler {
	private readonly chatsPath: string;
	private readonly usersPath: string;

	private chats: Chats = {};
	private users: Users = {};

	constructor(private path = 'src/data/') {
		this.chatsPath = `${path}chats.json`;
		this.usersPath = `${path}users.json`;
	}

	async init() {
		let files: string[] = [];
		try {
			files = await readdir(this.path);
		} catch (e) {
			await mkdir(this.path);
		} finally {
			if (!files.includes('chats.json')) await this.writeToFile(this.chatsPath, {});
			if (!files.includes('users.json')) await this.writeToFile(this.usersPath, BOTS);
			this.chats = await this.readFile<Chats>(this.chatsPath);
			this.users = await this.readFile<Users>(this.usersPath);
			// this interval was made to autosave data and not save it in every action.
			// Prone to possible data loss, but 30 seconds is usually not much of a trouble
			setInterval(this.saveData.bind(this), 30000);
		}
	}

	private async readFile<T>(filePath: string) {
		const chats = await readFile(filePath, { encoding: 'utf-8' });
		return JSON.parse(chats) as T;
	}

	private async writeToFile(path: string, data: object) {
		await writeFile(path, JSON.stringify(data, null, 2), {
			encoding: 'utf-8',
		});
	}

	private async saveData() {
		console.log(`Autosave - ${new Date().toLocaleString()}`);
		await this.writeToFile(this.usersPath, this.users);
		await this.writeToFile(this.chatsPath, this.chats);
	}

	connectUser(user: ReceivedUserCredentials) {
		const { userId } = user;
		if (!this.users[userId]) this.createUser(user);
		this.users[userId].online = true;
	}

	disconnectUser(userId: string) {
		// check if userId is truthy, due to seldom bug of user entering frontend with backend down and refreshing page when backend is up
		if (userId) this.users[userId].online = false;
	}

	private createUser(user: ReceivedUserCredentials) {
		const { userId, avatar, name } = user;
		this.users[userId] = {
			name,
			avatar,
			chats: {},
			online: true,
		};
	}

	private createChat(firstUserId: string, secondUserId: string) {
		const newChatId = uuidv4();
		this.chats[newChatId] = {
			messages: [],
			seenAt: '',
		};
		this.users[firstUserId]['chats'][secondUserId] = newChatId;
		this.users[secondUserId]['chats'][firstUserId] = newChatId;
		return newChatId;
	}

	getChat(firstUserId: string, secondUserId: string) {
		const chatId =
      this.users[firstUserId]['chats'][secondUserId] ||
      this.createChat(firstUserId, secondUserId);
		return {
			roomId: chatId,
			chat: this.chats[chatId],
		};
	}

	setSeenAt(chatId: string, date: string) {
		this.chats[chatId].seenAt = date;
	}

	addMessage(chatId: string, message: Message) {
		const chat = this.chats[chatId];
		this.chats[chatId] = {
			messages: [...chat.messages, message],
			seenAt: '',
		};
	}

	getUsers() {
		return { ...this.users };
	}

	checkUserSubscription(userId: string) {
		return this.users[userId].chats['spam'] !== undefined;
	}
}
