import { WsSocketMessage } from 'src/utils/types';
import { Socket, Server } from 'socket.io';
export const broadcast = (server: Server, data: string | number | object) => {
  server.emit('broadcast', data);
};
export const broadcastExceptSender = (sender: Socket, data: string | number | object) => {
  sender.broadcast.emit('broadcast', data);
};
