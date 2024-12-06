import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageController } from './controllers/image.controller';
import { ShazamService } from './services/shazam.service';
import { ShazamController } from './controllers/shazam.controller';
import { ImageService } from './services/image.service';
import envConfig from './utils/env';
import { ImageModule } from './modules/image.module';
import { ShazamModule1, ShazamModule2, ShazamModule3 } from './modules/shazam.module';
@Module({
  imports: [ConfigModule.forRoot({ load: [envConfig], isGlobal: true }), ImageModule, ShazamModule1, ShazamModule2, ShazamModule3],
  controllers: [ImageController, ShazamController],
  providers: [ImageService, ShazamService]
})
export class AppModule {}
