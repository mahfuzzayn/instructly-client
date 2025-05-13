export interface IUser {
    _id: string;
    userId: string;
    name: string;
    email: string;
    isActive?: boolean;
    role: "student" | "tutor";
    iat?: number;
    exp?: number;
}
