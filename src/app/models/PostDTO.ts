import { CommentDTO } from "./Comment";

export interface PostDTO {
    profileImage?: any;
    id?:any;
    content: string;
    audience: string;
    imageUrl?: string;
    userId: number;
    createdAt?: string;
    username?: string;
    showComments?: boolean;
    comments?: CommentDTO[];
    newComment?: string;
    likedByCurrentUser?: boolean;
    likesCount?: number;
}