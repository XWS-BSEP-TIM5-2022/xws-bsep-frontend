import { FeedPosition } from "./feed-position";

export class FeedJobOffer {
    Id: number;
    CompanyId: number;
    Position: FeedPosition = new FeedPosition;
    JobDescription!: string;
    DailyActivities!: string;
    Preconditions!: string;
}
