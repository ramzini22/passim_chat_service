import { Body, Get, Param, Post, Query, Headers } from '@nestjs/common';
import { ChatsService } from '../services/chats.service';
import { CreateOpenChatDto } from '../dto/requests/create-open-chat.dto';
import { QueryGetChatsDto } from '../dto/requests/query-get-chats.dto';
import { ChatEntity } from '../entities/chat.entity';
import { DataResponse } from '../../../common/swagger/data-response.dto';
import { ApiController } from '../../../common/decorators/swagger/api-controller.decorator';
import { ApiDataResponse } from '../../../common/decorators/swagger/api-data-response.decorator';

@ApiController('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) {}

    @Post()
    @ApiDataResponse(ChatEntity, 'создания чата')
    createChat(
        @Body() body: CreateOpenChatDto,
        @Headers('websocket-key') socketId?: string,
    ): Promise<DataResponse<ChatEntity>> {
        return this.chatsService.createOpenChat(body.title, socketId);
    }

    @Get()
    @ApiDataResponse(ChatEntity, 'получения чатов', true)
    async getChats(@Query() query: QueryGetChatsDto): Promise<DataResponse<ChatEntity[]>> {
        return await this.chatsService.getOpenChats(query.title, query.offset, query.limit);
    }

    @Get(':id')
    @ApiDataResponse(ChatEntity, 'получения чата по id')
    async getChat(@Param('id') id: number): Promise<DataResponse<ChatEntity>> {
        return this.chatsService.findChat(id);
    }
}
