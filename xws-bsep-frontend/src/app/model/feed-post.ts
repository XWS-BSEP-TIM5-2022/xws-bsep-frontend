import { Comment } from "./comment";
import { Dislike } from "./dislike";
import { Like } from "./like";
import { User } from "./user";

export class FeedPost {
    Id: string;
    Text: string;
    Images: string[];
    Links: string[];
    DateCreated: string;
    Likes: Like[];
    Dislikes: Dislike[];
    Comments: Comment[];
    UserId: string;
    User: User;
}
