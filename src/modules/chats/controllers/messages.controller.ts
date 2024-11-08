import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateMessageDto } from '../dto/requests/create-post-message.dto';
import { MessagesService } from '../services/messages.service';
import { MessageEntity } from '../entities/message.entity';
import { QueryGetMessagesDto } from '../dto/requests/query-get-messages.dto';
import { DataResponse } from '../../../common/swagger/data-response.dto';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @ApiOkResponse({
        type: MessageEntity,
    })
    @Post()
    createMessage(@Body() message: CreateMessageDto): Promise<DataResponse<MessageEntity | string>> {
        return this.messagesService.createMessage(
            message.encryptMessage,
            message.chatId,
            message.message,
            message.parentMessageId,
        );
    }

    @ApiOkResponse({
        type: MessageEntity,
        isArray: true,
    })
    @Get()
    getMessages(@Query() query: QueryGetMessagesDto): Promise<DataResponse<MessageEntity[]>> {
        return this.messagesService.getMessages(query.chatId, query.limit, query.offset, query.search);
    }
}
