import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: [
      configService.get<string>('frontendVercel') as string,
      /https*:\/\/localhost.*$/,
      /^https*:\/\/192\.168\..*$/,
    ],
  });

  const port = configService.get('port');
  await app.listen(port, '0.0.0.0');
}
bootstrap();
