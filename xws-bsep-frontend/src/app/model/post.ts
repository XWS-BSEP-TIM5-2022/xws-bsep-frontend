import { Comment } from "./comment";
import { Company } from "./company";
import { Dislike } from "./dislike";
import { JobOffer } from "./job-offer";
import { Like } from "./like";
import { User } from "./user";

export class Post {
    id: string;
    text: string = "";
    images: string[] = [];
    links: string[] = [];
    dateCreated: string = "";
    likes: Like[] = [];
    dislikes: Dislike[] = [];
    comments: Comment[] = [];
    userId: string;
    user: User = new User;
    jobOffer: JobOffer = new JobOffer;
    company: Company = new Company;
    isJobOffer: boolean;
    image : string = ""
}


