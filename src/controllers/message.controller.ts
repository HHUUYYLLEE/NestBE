import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { MessageService } from 'src/services/message.service';
import { Response } from 'express';
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  allMessages(@Res() res: Response): void {
    res.status(HttpStatus.OK).send({ message: 'Found messages list', messageList: this.messageService.getAllMessages() });
  }
}
