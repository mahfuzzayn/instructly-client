/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { StatusColorMap } from "@/components/ui/core/ITStatusBadge/ITStatusBadge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { changeBookingStatus } from "@/services/Booking";
import { IBooking, IStatusForStudent, StatusActionName } from "@/types";
import React from "react";
import { toast } from "sonner";

const StudentBookingStatusChange = ({ booking }: { booking: IBooking }) => {
    const handleStatusChange = async (status: IStatusForStudent) => {
        const toastId = toast.loading("Updating Booking Status...");

        const statusData = {
            status,
        };

        try {
            const res = await changeBookingStatus(booking?._id, statusData);

            if (res.success) {
                toast.success("Status updated successfully.", { id: toastId });
            } else {
                toast.warning(res.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error("Failed to updated status.", { id: toastId });
            return Error(error);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-green-500 hover:bg-green-700 text-white hover:text-white"
                >
                    Change Status
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-y-2">
                    {Object.keys(IStatusForStudent).map((status, idx) => (
                        <Button
                            key={idx}
                            className={`${
                                StatusColorMap[
                                    IStatusForStudent[
                                        status as keyof typeof IStatusForStudent
                                    ] as IStatusForStudent
                                ]
                            }`}
                            onClick={() =>
                                handleStatusChange(
                                    IStatusForStudent[
                                        status as keyof typeof IStatusForStudent
                                    ] as IStatusForStudent
                                )
                            }
                        >
                            {
                                StatusActionName[
                                    IStatusForStudent[
                                        status as keyof typeof IStatusForStudent
                                    ] as IStatusForStudent
                                ]
                            }
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default StudentBookingStatusChange;
