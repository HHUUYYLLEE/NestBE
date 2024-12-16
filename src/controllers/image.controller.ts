import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ImageService } from '../services/image.service';
import { Response } from 'express';
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async randomImage(@Res() res: Response): Promise<void> {
    let url = 'error';
    while (url === 'error' || url === '//st.prntscr.com/2023/07/24/0635/img/0_173a7b_211be8ff.png')
      url = await this.imageService.getRandomImage();
    res.status(HttpStatus.OK).send({ message: 'Found random image.', url: url });
  }
}
