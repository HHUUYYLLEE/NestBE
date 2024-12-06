import { Injectable } from '@nestjs/common';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { shazamAPI } from 'src/utils/types';
import { firstValueFrom } from 'rxjs';
import { AbstractShazamService1, AbstractShazamService2, AbstractShazamService3 } from './abstract/abstract-shazam.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ShazamService {
  constructor(
    private readonly configService: ConfigService,
    private readonly abstractShazamService1: AbstractShazamService1,
    private readonly abstractShazamService2: AbstractShazamService2,
    private readonly abstractShazamService3: AbstractShazamService3
  ) {}
  async findShazamSong(file: MemoryStorageFile, filename: string): Promise<shazamAPI> {
    const random = Math.floor(Math.random() * 3);
    let response;
    switch (random) {
      default:
      case 0:
        response = await firstShazamAPI(this.configService.get<string>('shazamAPIRoute1') as string, file, this.abstractShazamService1);
        break;
      case 1:
        response = await secondShazamAPI(
          this.configService.get<string>('shazamAPIRoute2') as string,
          file,
          filename,
          this.abstractShazamService2
        );
        break;
      case 2:
        response = await thirdShazamAPI(
          this.configService.get<string>('shazamAPIRoute3') as string,
          file,
          filename,
          this.abstractShazamService3
        );
        break;
    }
    console.log(response.data);
    if (response.result === 'success')
      return {
        result: 'success',
        songName: response.data.track.title || '',
        singers: response.data.track.subtitle || 'unknown',
        songAlbumArt:
          response.data.track.images.coverarthq ||
          response.data.track.images.coverart ||
          response.data.track.share.image ||
          response.data.track.sections?.[0]?.metapages?.[1]?.image ||
          '#',
        songPreviewUrl: response.data.track.hub.actions?.filter((e: { [key: string]: string }) => e.type === 'uri') || '#',
        songAlbum:
          response.data.track.sections?.[0]?.metadata?.filter((e: { [key: string]: string }) => e.title === 'Album').text || 'unknown',
        songRelease:
          response.data.track.sections?.[0]?.metadata?.filter((e: { [key: string]: string }) => e.title === 'Released').text ||
          new Date(response.data.track.releasedate?.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'))?.getFullYear() ||
          'unknown',
        songShazamMusic: response.data.track.url || '#',
        songYoutubeMusic:
          response.data.track.hub.providers?.filter(
            (e: { caption: string; actions: Array<{ [key: string]: string }>; images: { [key: string]: string }; type: string }) =>
              e.type === 'YOUTUBEMUSIC'
          ).actions?.[0]?.uri || '#'
      };
    else return response;
  }
}

const firstShazamAPI = async (route: string, file: MemoryStorageFile, abstractShazamService: AbstractShazamService1) => {
  const body = new FormData();
  body.append('file', new Blob([file.buffer]));
  try {
    const response = await firstValueFrom(abstractShazamService.post(route, body));
    return { result: 'success', data: response.data };
  } catch (error) {
    return { result: 'error', error };
  }
};
const secondShazamAPI = async (route: string, file: MemoryStorageFile, filename: string, abstractShazamService: AbstractShazamService1) => {
  const body = new FormData();
  body.append('upload_file', new Blob([file.buffer]), filename);
  try {
    const response = await firstValueFrom(abstractShazamService.post(route, body));
    return { result: 'success', data: response.data };
  } catch (error) {
    return { result: 'error', error };
  }
};
const thirdShazamAPI = async (route: string, file: MemoryStorageFile, filename: string, abstractShazamService: AbstractShazamService1) => {
  const body = new FormData();
  body.append('upload_file', new Blob([file.buffer]), filename);
  try {
    const response = await firstValueFrom(abstractShazamService.post(route, body));
    return { result: 'success', data: response.data };
  } catch (error) {
    return { result: 'error', error };
  }
};
