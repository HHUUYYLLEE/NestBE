import { Module } from '@nestjs/common';
import { AbstractMessageService } from 'src/services/abstract/abstract-message.service';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 10000
    })
  ],
  providers: [
    {
      provide: AbstractMessageService,
      useExisting: HttpService
    }
  ],
  exports: [AbstractMessageService]
})
export class MessageModule {}
