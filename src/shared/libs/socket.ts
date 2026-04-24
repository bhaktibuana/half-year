import { io } from 'socket.io-client';
import { env } from '@/configs';

const socket = io(env.APP_SOCKET_URL, {
	transports: ['websocket'],
});

export const registerUserSocket = (userId: string) => {
	socket.emit('register', userId);
};

export default socket;
