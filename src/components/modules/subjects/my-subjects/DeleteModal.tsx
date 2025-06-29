/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { deleteSubject } from "@/services/Subject";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const DeleteModal = ({
    subjectId,
    open,
    setIsOpen,
}: {
    subjectId: string;
    open: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const handleDelete = async (subjectId: string) => {
        try {
            const res = await deleteSubject(subjectId);

            if (res.success) {
                toast.success("Subject deleted successfully");
                setIsOpen(false);
            } else {
                toast.success(res?.success);
            }
        } catch (error: any) {
            return Error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogContent
                className="sm:max-w-[425px] gap-6"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-[22px] text-it-medium-dark">
                        Delete Subject
                    </DialogTitle>
                    <DialogDescription className="text-black text-[16px] !mt-4">
                        Are you sure to delete this subject? This cannot be
                        undone!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={() => handleDelete(subjectId)}
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 px-6"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
