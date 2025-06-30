import { IStudent } from "./student";
import { ITutor } from "./tutor";

export interface IReview {
    _id: string;
    student: IStudent;
    tutor: ITutor;
    isVisible: boolean;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}
