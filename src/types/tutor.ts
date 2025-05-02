export interface ITutor {
    _id: string;
    user: string;
    bio: string;
    hourlyRate: number;
    profileUrl: string;
    earnings: number;
    subjects: string[];
    availability: IAvailability[];
    reviews: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IAvailability {
    _id: string;
    day: DaysOfWeek;
    startTime: string;
    endTime: string;
    totalHours: number;
}

export enum DaysOfWeek {
    Saturday = "Saturday",
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
}
