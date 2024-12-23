import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { broadcast, broadcastExceptSender } from 'src/utils/socket';

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
    console.log(data);
    broadcastExceptSender(client, { id: client.id, data });
  }
}
