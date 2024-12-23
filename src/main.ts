import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { WebSocketGateway } from '@nestjs/websockets';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { EventsGateway } from 'src/gateways/events.gateway';
const fastifyMultipart = require('@fastify/multipart');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ bodyLimit: 1073741824 }));
  await app.register(fastifyMultipart);

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: [
      configService.get<string>('frontendVercel') as string,
      /https*:\/\/localhost.*$/,
      /^https*:\/\/192\.168\..*$/,
      /http*:\/\/localhost.*$/,
      /^http*:\/\/192\.168\..*$/
    ]
  });

  const port = configService.get('port');
  // app.useWebSocketAdapter(new WsAdapter(app));
  app.useWebSocketAdapter(new IoAdapter(app));
  decorateGateway(EventsGateway, configService);
  await app.listen(port, '0.0.0.0');
}
function decorateGateway(gateway: any, configService: ConfigService) {
  WebSocketGateway({
    cors: {
      origin: [
        configService.get<string>('frontendVercel') as string,
        /https*:\/\/localhost.*$/,
        /^https*:\/\/192\.168\..*$/,
        /http*:\/\/localhost.*$/,
        /^http*:\/\/192\.168\..*$/
      ]
    }
  })(gateway);
}

bootstrap();
