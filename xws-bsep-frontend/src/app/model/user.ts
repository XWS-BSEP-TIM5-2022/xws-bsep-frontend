import { Education } from "./education";
import { Experience } from "./experience";
import { Interest } from "./interest";
import { Skill } from "./skill";

export class User {
    id: string = "";
    name: string = "";
    lastName: string = "";
    email: string;
    mobileNumber: string;
    gender: string;
    birthday: string;
    biography: string;
    isPublic: boolean;
    education: Education[];
    experience: Experience[]
    skills: Skill[];   
    interests: Interest[];
    isActive: boolean;
    role: string;
    isConnected: boolean;
    request: boolean;
    username: string;
    blocked: boolean;
    postNotification: boolean;
    messageNotification: boolean;
    followNotification: boolean;
}
