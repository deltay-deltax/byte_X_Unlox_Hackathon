import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

let socket;

export function getSocket() {
	if (!socket) {
		socket = io(SOCKET_URL, {
			transports: ['websocket'],
		});
	}
	return socket;
}

export function disconnectSocket() {
	if (socket) {
		socket.disconnect();
		socket = undefined;
	}
}
