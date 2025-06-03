export interface CommentDTO {
    id?: number;
    postId: number;
    userId: number;
    content: string;
    createdAt?: string;
    username?: string;
  }