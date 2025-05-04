import { ISubject } from "./subject";
import { IUser } from "./user";

export interface IStudent {
    _id: string;
    user: IUser
    bio: string;
    gradeLevel: string;
    subjectsOfInterest: ISubject[];
    bookingHistory: string[];
    reviewsGiven: string[];
    profileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}