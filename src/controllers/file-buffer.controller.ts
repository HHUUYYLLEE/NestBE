import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { FileBufferService } from '../services/file-buffer.service';
import { Response } from 'express';
@Controller('audio')
export class FileBufferController {
  constructor(private readonly fileBufferService: FileBufferService) {}

  @Post()
  async fileBuffer(@Res() res: Response, @Body() body: { url: string }): Promise<void> {
    let buffer = await this.fileBufferService.fileBuffer(body.url);
    if (buffer !== 'error') res.status(HttpStatus.OK).send({ message: 'Buffer found.', buffer: buffer });
    else res.status(HttpStatus.NOT_FOUND).send({ message: 'Buffer not found.' });
  }
}
