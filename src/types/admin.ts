import { IUser } from "./user";

export interface IAdmin {
    _id: string;
    user: IUser;
    bio: string;
    profileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
