import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AbstractFileBufferService } from '../services/abstract/abstract-file-buffer.service';

@Injectable()
export class FileBufferService {
  constructor(private readonly abstractFileBufferService: AbstractFileBufferService) {}
  async fileBuffer(url: string): Promise<string | Buffer> {
    try {
      return Buffer.from(
        (
          await firstValueFrom(
            this.abstractFileBufferService.get(url, { maxBodyLength: Infinity, maxContentLength: Infinity, responseType: 'arraybuffer' })
          )
        ).data,
        'utf-8'
      );
    } catch (error) {
      return 'error';
    }
  }
}
