import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageController } from 'src/controllers/image.controller';
import { ShazamService } from 'src/services/shazam.service';
import { ShazamController } from 'src/controllers/shazam.controller';
import { ImageService } from 'src/services/image.service';
import envConfig from 'src/utils/env';
import { ImageModule } from 'src/modules/image.module';
import { ShazamModule1, ShazamModule2, ShazamModule3 } from 'src/modules/shazam.module';
import { FileBufferModule } from 'src/modules/file-buffer.module';
import { FileBufferService } from 'src/services/file-buffer.service';
import { FileBufferController } from 'src/controllers/file-buffer.controller';
import { EventsGateway } from 'src/gateways/events.gateway';
import { MessageModule } from 'src/modules/message.module';
import { MessageController } from 'src/controllers/message.controller';
import { MessageService } from 'src/services/message.service';
import { UserModule } from 'src/modules/user.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envConfig], isGlobal: true }),
    ImageModule,
    ShazamModule1,
    ShazamModule2,
    ShazamModule3,
    FileBufferModule,
    MessageModule,
    UserModule
  ],
  controllers: [ImageController, ShazamController, FileBufferController, MessageController, UserController],
  providers: [ImageService, ShazamService, FileBufferService, EventsGateway, MessageService, UserService]
})
export class AppModule {}
