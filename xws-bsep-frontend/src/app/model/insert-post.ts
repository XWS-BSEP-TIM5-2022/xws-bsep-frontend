import { Comment } from "./comment";
import { Dislike } from "./dislike";
import { Like } from "./like";
import { User } from "./user";

export class InsertPost {
    id: string;
    text: string = "";
    images: string[] = [];
    links: string[] = [];
    likes: Like[] = [];
    dislikes: Dislike[] = [];
    comments: Comment[] = [];
    userId: string;
    user: User = new User;
}
