import { User } from "../user";
import { FeedComment } from "./feed-comment";
import { FeedCompany } from "./feed-company";
import { FeedDislike } from "./feed-dislike";
import { FeedJobOffer } from "./feed-job-offer";
import { FeedLike } from "./feed-like";

export class FeedPost {
    Id: string;
    Text: string;
    Images: string[];
    Links: string[];
    DateCreated: string;
    Likes: FeedLike[];
    Dislikes: FeedDislike[];
    Comments: FeedComment[];
    UserId: string;
    User: User = new User;
    JobOffer: FeedJobOffer = new FeedJobOffer;
    Company: FeedCompany = new FeedCompany;
    IsJobOffer: boolean;
}
