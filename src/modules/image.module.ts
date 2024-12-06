import { Module } from '@nestjs/common';
import { AbstractImageService } from 'src/services/abstract/abstract-image.service';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 12000
    })
  ],
  providers: [
    {
      provide: AbstractImageService,
      useExisting: HttpService
    }
  ],
  exports: [AbstractImageService]
})
export class ImageModule {}
