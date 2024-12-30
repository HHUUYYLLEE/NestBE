import { Module } from '@nestjs/common';
import { AbstractUserService } from 'src/services/abstract/abstract-user.service';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 8000
    })
  ],
  providers: [
    {
      provide: AbstractUserService,
      useExisting: HttpService
    }
  ],
  exports: [AbstractUserService]
})
export class UserModule {}
