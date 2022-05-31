import { Position } from "./position";

export class JobOffer {
    id: number;
    companyId: number;
    position: Position = new Position;
    jobDescription!: string;
    dailyActivities!: string;
    preconditions!: string;
}
