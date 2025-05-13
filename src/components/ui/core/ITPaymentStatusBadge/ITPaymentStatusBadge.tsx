import { IPaymentStatus, PaymentStatusDisplayName } from "@/types";

export const StatusColorMap: Record<IPaymentStatus, string> = {
    [IPaymentStatus.PENDING]: "bg-yellow-200 text-yellow-800 border-yellow-400",
    [IPaymentStatus.COMPLETED]: "bg-green-200 text-green-800 border-green-400",
    [IPaymentStatus.CANCELED]: "bg-red-200 text-red-800 border-red-400",
};

export const ITPaymentStatusBadge = ({
    status,
}: {
    status: IPaymentStatus;
}) => {
    const colorClass = StatusColorMap[status];
    return (
        <div className={`cursor-pointer px-2 py-1 text-xs rounded-md ${colorClass}`}>
            {PaymentStatusDisplayName[status]}
        </div>
    );
};
