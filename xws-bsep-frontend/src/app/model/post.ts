import { Comment } from "./comment";
import { Dislike } from "./dislike";
import { Like } from "./like";
import { User } from "./user";

export class Post {
    id: string;
    text: string;
    images: string[];
    links: string[];
    dateCreated: string;
    likes: Like[];
    dislikes: Dislike[];
    comments: Comment[];
    userId: string;
    user: User;
}


