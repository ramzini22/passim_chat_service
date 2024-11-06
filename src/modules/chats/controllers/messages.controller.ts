import { Body, Get, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from '../dto/requests/create-post-message.dto';
import { MessagesService } from '../services/messages.service';
import { MessageEntity } from '../entities/message.entity';
import { QueryGetMessagesDto } from '../dto/requests/query-get-messages.dto';
import { DataResponse } from '../../../common/swagger/data-response.dto';
import { ApiController } from '../../../common/decorators/swagger/api-controller.decorator';
import { ApiDataResponse } from '../../../common/decorators/swagger/api-data-response.decorator';

@ApiController('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    @ApiDataResponse(MessageEntity, 'создания сообщения')
    createMessage(@Body() message: CreateMessageDto): Promise<DataResponse<MessageEntity>> {
        return this.messagesService.createMessage(
            message.encryptMessage,
            message.chatId,
            message.message,
            message.parentMessageId,
        );
    }

    @Get()
    @ApiDataResponse(MessageEntity, 'получения сообщений', true)
    getMessages(@Query() query: QueryGetMessagesDto): Promise<DataResponse<MessageEntity[]>> {
        return this.messagesService.getMessages(query.chatId, query.limit, query.offset, query.search);
    }
}
