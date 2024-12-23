import { WsSocketMessage } from 'src/utils/types';
import { Socket } from 'socket.io';
export const sendClientMessage = (client: Socket, event: string, data: string | object | number) => {
  const sendData: WsSocketMessage = {
    event,
    data
  };
  client.send(JSON.stringify(sendData));
};
