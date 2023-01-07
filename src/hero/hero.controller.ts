import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators';
import {
  ClientGrpc,
  GrpcMethod,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/models/chat-message';
import { ChatMessageResponse, ChatMessageResponseList } from 'src/models/chat-message-response';
import { GetChatMessageRequest } from 'src/models/get-chat-message-request';

interface ChatService {
    sendChatMessage(upstream: ChatMessage): Observable<ChatMessageResponse>;
    getChatMessage(username: GetChatMessageRequest): Observable<ChatMessageResponseList[]>;
}

@Controller('hero')
export class HeroController implements OnModuleInit {

    private messages: ChatMessageResponse[] = [];

    private chatService: ChatService;

    constructor(
        @Inject('HERO_PACKAGE') private readonly client: ClientGrpc
    ) {}

    onModuleInit() {
        this.chatService = this.client.getService<ChatService>('ChatService');
    }

    @Get('test')
    getMess(): Observable<ChatMessageResponseList[]> {
        return this.chatService.getChatMessage({ username: 'George' });
    }

    @Post('test')
    sendMess(@Body() message: ChatMessage) {
        return this.chatService.sendChatMessage(message);
    }

    @Patch('test/:message/:seen/:typing')
    editMess(@Param('message') message: string, @Param('seen') seen: string, @Param('typing') typing: string) {
        const mess = this.messages.find((m) => m.message.message === message);
        mess.message.seen = seen;
        mess.message.typing = typing;
        return mess;
    }

    @GrpcMethod('ChatService', 'getChatMessage')
    getChatMessage(username: GetChatMessageRequest): ChatMessageResponseList {
        return { messages: this.messages }
    }

    @GrpcMethod('ChatService', 'sendChatMessage')
    sendChatMessage(message: ChatMessage): ChatMessageResponse {
        const object: ChatMessageResponse = {
           timestamp: Date.now().toString(),
           message: message,
        };
        console.log(object);
        this.messages.push(object);
        return object;
    }
}