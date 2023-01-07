import { ChatMessage } from "./chat-message";

export interface ChatMessageResponse {
    timestamp: string;
    message: ChatMessage;
}

export interface ChatMessageResponseList {
    messages: ChatMessageResponse[];
}