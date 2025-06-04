export interface ChatMessageDTO {
    id?:any;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp?: string;
}
  