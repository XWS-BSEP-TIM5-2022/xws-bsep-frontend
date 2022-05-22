import { User } from "./user";

export class Comment {
    id: string;
    userId: string;
    text: string;
    user: User = new User;
}
