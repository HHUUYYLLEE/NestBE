import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { randomImageString } from '../utils/misc';
import { ConfigService } from '@nestjs/config';
import { AbstractImageService } from '../services/abstract/abstract-image.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ImageService {
  constructor(
    private readonly configService: ConfigService,
    private readonly abstractImageService: AbstractImageService
  ) {}
  async getRandomImage(): Promise<string> {
    const rand = Math.floor(Math.random() * 2);
    switch (rand) {
      case 0:
        try {
          const response = await firstValueFrom(
            this.abstractImageService.get(`${this.configService.get<string>('randomImagePrefixURL')}/${randomImageString()}`)
          );

          const data = response.data;
          const elem = new JSDOM(data);
          const src = elem.window.document.getElementsByTagName('img')[0].src;
          return src;
        } catch (error) {
          return 'error';
        }
      case 1:
      default:
        const randomWidth = Math.floor(Math.random() * 2801) + 200;
        const randomHeight = Math.floor(Math.random() * 1801) + 200;
        try {
          const response = await firstValueFrom(
            this.abstractImageService.get(`https://picsum.photos/${randomWidth.toString()}/${randomHeight.toString()}`)
          );
          return response.request.res.responseUrl;
        } catch (error) {
          return 'error';
        }
    }
  }
}
