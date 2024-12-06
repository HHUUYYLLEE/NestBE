import { Controller, Get } from '@nestjs/common';
import { ImageService } from '../services/image.service';
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async randomImage(): Promise<{ message: string; url: string }> {
    let url = 'error';
    while (url === 'error' || url === '//st.prntscr.com/2023/07/24/0635/img/0_173a7b_211be8ff.png')
      url = await this.imageService.getRandomImage();
    return { message: 'Found random image.', url: url };
  }
}
