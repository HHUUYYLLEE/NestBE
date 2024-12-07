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
