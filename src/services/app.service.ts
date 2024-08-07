import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { randomImageString } from 'src/utils/misc';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  async getRandomImage(): Promise<string> {
    const rand = Math.floor(Math.random() * 2);
    switch (rand) {
      case 0:
        try {
          const response = await axios({
            method: 'get',
            url:
              this.configService.get<string>('randomImagePrefixURL') +
              randomImageString(),
            timeout: 12000,
          });
          const data = await response.data;
          const elem = new JSDOM(data);
          return elem.window.document.getElementsByTagName('img')[0].src;
        } catch (error) {}
      case 1:
      default:
        const randomWidth = Math.floor(Math.random() * 2801) + 200;
        const randomHeight = Math.floor(Math.random() * 1801) + 200;
        try {
          const response = await axios.get(
            'https://picsum.photos/' +
              randomWidth.toString() +
              '/' +
              randomHeight.toString(),
          );
          return response.request.res.responseUrl;
        } catch (error) {
          return 'error';
        }
    }
  }
}
