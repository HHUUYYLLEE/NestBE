import { Module } from '@nestjs/common';
import { AbstractShazamService1, AbstractShazamService2, AbstractShazamService3 } from 'src/services/abstract/abstract-shazam.service';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: `https://${configService.get<string>('shazamAPIHost1')}`,
        timeout: 45000,
        headers: {
          'Content-Type': 'application/octet-stream',
          'x-rapidapi-key': configService.get<string>('shazamAPIKey'),
          'x-rapidapi-host': configService.get<string>('shazamAPIHost1')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: AbstractShazamService1,
      useExisting: HttpService
    }
  ],
  exports: [AbstractShazamService1]
})
export class ShazamModule1 {}

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: `https://${configService.get<string>('shazamAPIHost2')}`,
        timeout: 45000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-rapidapi-key': configService.get<string>('shazamAPIKey'),
          'x-rapidapi-host': configService.get<string>('shazamAPIHost2')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: AbstractShazamService2,
      useExisting: HttpService
    }
  ],
  exports: [AbstractShazamService2]
})
export class ShazamModule2 {}

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: `https://${configService.get<string>('shazamAPIHost3')}`,
        timeout: 45000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-rapidapi-key': configService.get<string>('shazamAPIKey'),
          'x-rapidapi-host': configService.get<string>('shazamAPIHost3')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: AbstractShazamService3,
      useExisting: HttpService
    }
  ],
  exports: [AbstractShazamService3]
})
export class ShazamModule3 {}
