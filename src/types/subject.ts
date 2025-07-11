export enum SubjectStatus {
    ACTIVE = "active",
    DISCONTINUED = "discontinued",
}

export enum GradeLevel {
    PRIMARY = "Primary",
    SECONDARY = "Secondary",
    HIGH_SCHOOL = "High School",
    COLLEGE = "College",
    UNIVERSITY = "University",
    OTHER = "Other",
}

export enum SubjectCategory {
    SCIENCE = "Science",
    MATH = "Math",
    LANGUAGE = "Language",
    TECHNOLOGY = "Technology",
    PROGRAMMING = "Programming",
    AI = "Ai",
    ARTS = "Arts",
    SPORTS = "Sports",
    OTHER = "Other",
}

export interface ISubject {
    _id: string;
    tutor: string;
    name: string;
    gradeLevel: GradeLevel;
    category: SubjectCategory;
    status: SubjectStatus;
    createdAt: Date;
    updatedAt: Date;
}
