export interface IUser {
    _id: string;
    userId: string;
    name: string;
    email: string;
    isActive?: boolean;
    role: "student" | "tutor" | "admin";
    iat?: number;
    exp?: number;
    createdAt: Date;
    updatedAt: Date;
}
