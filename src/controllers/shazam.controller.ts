import { Controller, Post, Body, UseInterceptors, HttpStatus, Res } from '@nestjs/common';
import { ShazamService } from '../services/shazam.service';
import { FileInterceptor, UploadedFile, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { Response } from 'express';

@Controller('shazam')
export class ShazamController {
  constructor(private readonly shazamService: ShazamService) {}

  @Post()
  @UseInterceptors(FileInterceptor('upload_file'))
  async searchSong(@Res() res: Response, @Body() body: { filename: string }, @UploadedFile() file: MemoryStorageFile): Promise<void> {
    const data = await this.shazamService.findShazamSong(file, body.filename);
    if (data.result === 'success')
      res.status(HttpStatus.OK).send({
        songName: data.songName,
        singers: data.singers,
        songAlbumArt: data.songAlbumArt,
        songPreviewUrl: data.songPreviewUrl,
        songAlbum: data.songAlbum,
        songRelease: data.songRelease,
        songShazamMusic: data.songShazamMusic,
        songYoutubeMusic: data.songYoutubeMusic
      });
    else res.status(HttpStatus.NOT_FOUND).send(data);
  }
}
