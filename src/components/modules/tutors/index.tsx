"use client";

import { IMeta, ITutor } from "@/types";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import TutorCard from "./TutorCard";

const Tutors = ({ tutors, meta }: { tutors: ITutor[]; meta: IMeta }) => {
    return (
        <div className="ml-0 mt-0 m-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {tutors.map((tutor) => (
                    <TutorCard key={tutor?._id} tutor={tutor} />
                ))}
            </div>
            <div className="mt-10">
                <TablePagination totalPage={meta?.totalPage} />
            </div>
        </div>
    );
};

export default Tutors;
