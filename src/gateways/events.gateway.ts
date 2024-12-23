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
import { sendClientMessage } from 'src/utils/socket';
@WebSocketGateway({
  cors: {
    origin: function (this: EventsGateway) {
      return [
        this.configService.get<string>('frontendVercel') as string,
        /https*:\/\/localhost.*$/,
        /^https*:\/\/192\.168\..*$/,
        /http*:\/\/localhost.*$/,
        /^http*:\/\/192\.168\..*$/
      ];
    }
  }
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly configService: ConfigService) {}
  @WebSocketServer()
  private readonly server: Server;
  wsClients: Socket[] = [];
  private broadcast(data: string | object | number) {
    for (let client of this.wsClients) sendClientMessage(client, 'broadcast-message', data);
  }
  handleConnection(client: Socket) {
    // console.log('connected');
    this.wsClients.forEach((client) => sendClientMessage(client, 'broadcast-message', 1));
    this.wsClients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.wsClients.forEach((client) => sendClientMessage(client, 'broadcast-message', 2));
    this.wsClients = this.wsClients.filter((c) => c !== client);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<any> {
    console.log(payload);
    this.broadcast('message-socket');
    return { event: 'message-reply', data: payload };
  }
}
