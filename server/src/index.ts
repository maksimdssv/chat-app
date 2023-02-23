import {
	BotsType,
	ChatRecord,
	Message,
	ReceivedMessage,
	ReceivedUserCredentials,
} from './types/socket';
import { Server, Socket } from 'socket.io';
import { BOTS, getCurrentTime, getRandomTime, reverseString } from './utils';
import ChatHandler from './chat-handler';

const chatHandler = new ChatHandler();

const io = new Server(3000, {
	cors: { origin: 'http://localhost:5173' },
});

chatHandler.init().then(() => {
	const contacts = Object.keys(chatHandler.getUsers());
	const users = contacts.slice(4);
	for (const user of users) {
		subscribeToSpam(user);
	}
});

io.on('connection', (socket) => {
	let userId = '';
	socket.on('login', (userCredentials: ReceivedUserCredentials) => {
		userId = userCredentials.userId;
		chatHandler.connectUser(userCredentials);
		io.emit('contacts', chatHandler.getUsers());
		if (!chatHandler.checkUserSubscription(userId)) subscribeToSpam(userId);
	});

	socket.on(
		'join-chat',
		(
			firstUserId: string,
			secondUserId: string,
			cb: (chat: ChatRecord, roomId: string) => void,
		) => {
			disconnectSocket(socket);
			const { roomId, chat } = chatHandler.getChat(firstUserId, secondUserId);
			socket.join(roomId);
			cb(chat, roomId);
		},
	);

	socket.on('message', (message: ReceivedMessage, chatId: string) => {
		saveMessage(message, chatId);
		socket.to(chatId).emit('typing', false);
	});

	socket.on('bots', (message: ReceivedMessage, chatId: string, botType: BotsType) => {
		saveMessage(message, chatId);
		useBot(botType, chatId, socket, message.text);
	});

	socket.on('seen', (chatId: string) => {
		const date = getCurrentTime();
		chatHandler.setSeenAt(chatId, date);
		socket.to(chatId).emit('seen', date);
	});

	socket.on('typing', (chatId) => {
		socket.to(chatId).emit('typing', true);
	});

	socket.on('stop-typing', (chatId) => {
		socket.to(chatId).emit('typing', false);
	});

	socket.on('disconnect', () => {
		chatHandler.disconnectUser(userId);
		io.emit('contacts', chatHandler.getUsers());
	});
});

function disconnectSocket(socket: Socket) {
	const rooms = Array.from(socket.rooms);
	if (rooms.length > 1) {
		socket.leave(rooms[1]);
	}
}

function useBot(botType: BotsType, chatId: string, socket: Socket, message: string) {
	const date = getCurrentTime();
	socket.emit('typing', true);
	switch (botType) {
	case 'echo':
		fireBotAction(botType, chatId, socket, message, 0.5);
		break;
	case 'reverse':
		fireBotAction(botType, chatId, socket, reverseString(message), 3);
		break;
	default:
		chatHandler.setSeenAt(chatId, date);
		socket.emit('typing', false);
		socket.emit('seen', getCurrentTime());
	}
}

function subscribeToSpam(userId: string) {
	const { roomId } = chatHandler.getChat(userId, 'spam');
	sendSpam(getRandomTime(10, 120), roomId);
}

function fireBotAction(
	botType: BotsType,
	chatId: string,
	socket: Socket,
	message: string,
	seconds: number,
) {
	const newMessage: Message = {
		text: message,
		user: BOTS[botType].name,
		date: '',
	};
	setTimeout(() => {
		newMessage.date = getCurrentTime();
		socket.emit('typing', false);
		chatHandler.addMessage(chatId, newMessage);
		socket.emit('message', newMessage);
	}, seconds * 1000);
}

function sendSpam(seconds: number, roomId: string) {
	setTimeout(() => {
		const newAmount = getRandomTime(10, 120);
		const message: Message = {
			text: `This message was received after ${seconds} seconds. Next message will be sent in ${newAmount} seconds`,
			date: getCurrentTime(),
			user: BOTS['spam'].name,
		};
		chatHandler.addMessage(roomId, message);
		io.to(roomId).emit('message', message);
		sendSpam(newAmount, roomId);
	}, seconds * 1000);
}

function saveMessage(message: ReceivedMessage, chatId: string) {
	const newMessage: Message = {
		...message,
		date: getCurrentTime(),
	};
	chatHandler.addMessage(chatId, newMessage);
	io.to(chatId).emit('message', newMessage);
}
