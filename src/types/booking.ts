import { IStudent } from "./student";
import { IAvailability, ITutor } from "./tutor";

export enum IStatus {
    PENDING_APPROVAL = "pending_approval", // Default
    WAITING_FOR_PAYMENT = "waiting_for_payment", // Tutor 1
    CONFIRMED = "confirmed", // System 1
    CANCELED_BY_TUTOR = "canceled_by_tutor", // Tutor 2
    CANCELED_BY_STUDENT = "canceled_by_student", // Student 1
    COMPLETED = "completed", // System 2
}

export enum IStatusForTutor {
    WAITING_FOR_PAYMENT = "waiting_for_payment", // Tutor 1
    CANCELED_BY_TUTOR = "canceled_by_tutor", // Tutor 2
}

export enum IStatusForStudent {
    CANCELED_BY_STUDENT = "canceled_by_student", // Student 1
}

export enum IPaymentStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELED = "canceled",
}

export const StatusDisplayName: Record<IStatus, string> = {
    [IStatus.PENDING_APPROVAL]: "Pending Approval",
    [IStatus.WAITING_FOR_PAYMENT]: "Waiting for Payment",
    [IStatus.CONFIRMED]: "Confirmed",
    [IStatus.CANCELED_BY_TUTOR]: "Canceled by Tutor",
    [IStatus.CANCELED_BY_STUDENT]: "Canceled by Student",
    [IStatus.COMPLETED]: "Completed",
};

export const StatusActionName: Record<IStatus, string> = {
    [IStatus.PENDING_APPROVAL]: "Pending Approval",
    [IStatus.WAITING_FOR_PAYMENT]: "Approve for Payment",
    [IStatus.CONFIRMED]: "Confirmed",
    [IStatus.CANCELED_BY_TUTOR]: "Cancel",
    [IStatus.CANCELED_BY_STUDENT]: "Cancel",
    [IStatus.COMPLETED]: "Completed",
};

export const PaymentStatusDisplayName: Record<IPaymentStatus, string> = {
    [IPaymentStatus.PENDING]: "Pending",
    [IPaymentStatus.COMPLETED]: "Completed",
    [IPaymentStatus.CANCELED]: "Canceled",
};

export interface IBooking {
    _id: string;
    student: IStudent;
    tutor: ITutor;
    date: Date;
    totalHours: number;
    months: number;
    timeSlots: IAvailability[];
    price: number;
    status: IStatus;
    paymentStatus: IPaymentStatus;
    transactionId: string;
    createdAt: Date;
    updatedAt: Date;
}
