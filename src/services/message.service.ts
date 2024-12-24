import { Injectable } from '@nestjs/common';
import { AbstractMessageService } from 'src/services/abstract/abstract-message.service';
import { MessageListData } from 'src/utils/types';
import { GlobalService } from 'src/services/global.service';

@Injectable()
export class MessageService {
  constructor(private readonly abstractMessageService: AbstractMessageService) {}
  getAllMessages(): MessageListData[] {
    return GlobalService.messageList;
  }
}
