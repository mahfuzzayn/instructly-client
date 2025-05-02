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
import { deleteSubject } from "@/services/Tutor";
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Subject</DialogTitle>
                    <DialogDescription className="text-black !mt-5">
                        Are you sure to delete this subject? This cannot be
                        undone!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={() => handleDelete(subjectId)}
                        type="submit"
                        className="bg-red-500 hover:bg-red-700"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
