"use client";

import { IMeta, ITutor } from "@/types";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import TutorCard from "./TutorCard";

const Tutors = ({ tutors, meta }: { tutors: ITutor[]; meta: IMeta }) => {
    return (
        <div className="ml-5 lg:ml-0 mt-0 m-5">
            {tutors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {tutors.map((tutor) => (
                        <TutorCard key={tutor?._id} tutor={tutor} />
                    ))}
                </div>
            ) : (
                <div className="w-full mt-12">
                    <h2 className="text-xl font-bold text-center">No Tutors were found.</h2>
                </div>
            )}
            <div className="mt-10">
                {tutors.length > 0 && (
                    <TablePagination totalPage={meta?.totalPage} />
                )}
            </div>
        </div>
    );
};

export default Tutors;
