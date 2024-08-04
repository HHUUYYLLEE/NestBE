import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import envConfig from './utils/env';
@Module({
  imports: [ConfigModule.forRoot({ load: [envConfig], isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
