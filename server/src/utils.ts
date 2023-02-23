export const BOTS = {
	echo: {
		name: 'Echo bot',
		online: true,
		avatar: 'echo',
		chats: {},
	},
	reverse: {
		name: 'Reverse bot',
		online: true,
		avatar: 'reverse',
		chats: {},
	},
	spam: {
		name: 'Spam bot',
		online: true,
		avatar: 'spam',
		chats: {},
	},
	ignore: {
		name: 'Ignore bot',
		online: true,
		avatar: 'ignore',
		chats: {},
	},
} as const;

export const getCurrentTime = () =>
	new Date().toLocaleTimeString('en-US').replace(/:\d{2}\s/, ' ');

export const reverseString = (str: string) => str.split('').reverse().join('');

export const getRandomTime = (min: number, max: number) =>
	min + Math.round(Math.random() * (max - min));