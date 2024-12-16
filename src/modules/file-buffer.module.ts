import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
import { AbstractFileBufferService } from 'src/services/abstract/abstract-file-buffer.service';
@Module({
  imports: [
    HttpModule.register({
      timeout: 50000
    })
  ],
  providers: [
    {
      provide: AbstractFileBufferService,
      useExisting: HttpService
    }
  ],
  exports: [AbstractFileBufferService]
})
export class FileBufferModule {}
