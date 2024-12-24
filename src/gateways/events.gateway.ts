import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { broadcast, broadcastExceptSender, messageExceptSender } from 'src/utils/socket';
import { GlobalService } from 'src/services/global.service';
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;
  wsClients: Socket[] = [];
  handleConnection(client: Socket) {
    // console.log('connected');
    broadcastExceptSender(client, 1);
    this.wsClients.push(client);
  }

  handleDisconnect(client: Socket) {
    broadcastExceptSender(client, 2);
    this.wsClients = this.wsClients.filter((c) => c.id !== client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: number | string) {
    if (GlobalService.messageList.length >= 40) GlobalService.messageList.shift();
    GlobalService.messageList.push({ id: client.id, data, date: new Date() });
    messageExceptSender(client, { id: client.id, data });
  }
}
