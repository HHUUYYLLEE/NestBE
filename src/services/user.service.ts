import { Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { AbstractUserService } from 'src/services/abstract/abstract-user.service';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly abstractUserService: AbstractUserService
  ) {}
  async loginGoogle(credential: string): Promise<TokenPayload | null> {
    const backendClientId = this.configService.get('backendClientId');
    const oauth2Client = new OAuth2Client(backendClientId, this.configService.get('clientSecret'));
    const payloadData = (
      await oauth2Client.verifyIdToken({
        idToken: credential,
        audience: backendClientId
      })
    ).getPayload();
    if (payloadData) return payloadData;
    else return null;
  }
}
