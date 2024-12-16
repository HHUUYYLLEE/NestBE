import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageController } from './controllers/image.controller';
import { ShazamService } from './services/shazam.service';
import { ShazamController } from './controllers/shazam.controller';
import { ImageService } from './services/image.service';
import envConfig from './utils/env';
import { ImageModule } from './modules/image.module';
import { ShazamModule1, ShazamModule2, ShazamModule3 } from './modules/shazam.module';
import { FileBufferModule } from './modules/file-buffer.module';
import { FileBufferService } from './services/file-buffer.service';
import { FileBufferController } from './controllers/file-buffer.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [envConfig], isGlobal: true }),
    ImageModule,
    ShazamModule1,
    ShazamModule2,
    ShazamModule3,
    FileBufferModule
  ],
  controllers: [ImageController, ShazamController, FileBufferController],
  providers: [ImageService, ShazamService, FileBufferService]
})
export class AppModule {}
