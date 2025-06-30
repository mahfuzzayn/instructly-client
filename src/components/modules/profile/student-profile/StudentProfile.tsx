/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { IStudent, ISubject } from "@/types";
import ReCAPTCHA from "react-google-recaptcha";
import { reCaptchaTokenVerification } from "@/services/AuthService";
import ImagePreviewer from "@/components/ui/core/ITImageUploader/ImagePreviewer";
import ITImageUploader from "@/components/ui/core/ITImageUploader";
import { studentProfileSchema } from "./studentProfileSchema";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { gradeLevels } from "@/constants";
import { updateStudentProfile } from "@/services/Student";
import { Star, StarOff } from "lucide-react";

const StudentProfile = ({
    student,
    subjects,
}: {
    student: IStudent;
    subjects: ISubject[];
}) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        student?.profileUrl || null
    );
    const [subjectsOfInterest, setSubjectsOfInterest] = useState<string[]>(
        student?.subjectsOfInterest.map((s) => s?._id)
    );
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(studentProfileSchema),
        defaultValues: {
            name: student?.user?.name,
            bio: student?.bio,
            gradeLevel: student?.gradeLevel,
        },
    });

    const {
        control,
        formState: { isSubmitting, errors },
    } = form;

    const handleAddSubjectOfInterest = (
        subjectId: string,
        action: "remove" | "add"
    ) => {
        if (action === "add") {
            setSubjectsOfInterest((prevSubjectIds) => [
                ...prevSubjectIds,
                subjectId,
            ]);
        } else if (action === "remove") {
            setSubjectsOfInterest(
                subjectsOfInterest.filter((s) => s !== subjectId)
            );
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formData = new FormData();
        const modifiedData = {
            ...data,
            subjectsOfInterest,
        };

        formData.append("data", JSON.stringify(modifiedData));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await updateStudentProfile(formData);

            if (reCaptchaStatus) {
                if (res.success) {
                    toast.success(res?.message);
                } else {
                    toast.error(res?.message);
                }
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const handleReCaptcha = async (value: string | null) => {
        try {
            const res = await reCaptchaTokenVerification(value!);

            if (res?.success) {
                setReCaptchaStatus(true);
            }
        } catch (error: any) {
            console.error(Error(error));
        }
    };

    return (
        <div className="rounded-xl flex-grow w-full mx-auto p-5 login-form">
            <div className="flex justify-start mb-5">
                {imagePreview ? (
                    <ImagePreviewer
                        className="flex flex-wrap gap-4"
                        setImageFile={setImageFile}
                        imagePreview={imagePreview}
                        setImagePreview={setImagePreview}
                    />
                ) : (
                    <ITImageUploader
                        setImageFile={setImageFile}
                        setImagePreview={setImagePreview}
                        label="Upload Image"
                        className="w-full max-w-44 mt-0"
                    />
                )}
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="bg-it-light-primary text-black placeholder:text-gray-500"
                                        placeholder="Enter your name"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Bio</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="bg-it-light-primary text-black placeholder:text-gray-500"
                                        placeholder="Enter your bio"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <Controller
                        name="gradeLevel"
                        control={control}
                        render={({ field }) => (
                            <div className="form-item">
                                <label className="font-bold">Grade Level</label>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="mt-2 bg-it-light-primary w-full">
                                        <SelectValue placeholder="Select a grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {gradeLevels.map((grade, idx) => (
                                                <SelectItem
                                                    key={idx}
                                                    value={grade.value}
                                                >
                                                    {grade.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.gradeLevel && (
                                    <p className="text-red-500">
                                        {errors.gradeLevel.message as string}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                    <div className="space-y-3">
                        <h2 className="font-bold">Subjects of Interest</h2>
                        <div className="flex flex-wrap gap-5">
                            {subjects.map((subject, index) => (
                                <li
                                    className={`flex gap-x-4 items-center ${
                                        subjectsOfInterest.find((subjectId) => {
                                            return subjectId === subject?._id;
                                        })
                                            ? "bg-it-secondary"
                                            : "bg-gray-500"
                                    } text-white pl-2 rounded-md font-semibold list-none`}
                                    key={index}
                                >
                                    {subject.name}
                                    {subjectsOfInterest.find(
                                        (subjectId) =>
                                            subjectId === subject?._id
                                    ) ? (
                                        <Button
                                            className="bg-red-500 hover:bg-red-700"
                                            onClick={() =>
                                                handleAddSubjectOfInterest(
                                                    subject?._id,
                                                    "remove"
                                                )
                                            }
                                        >
                                            <StarOff />
                                        </Button>
                                    ) : (
                                        <Button
                                            className="hover:bg-it-secondary"
                                            onClick={() =>
                                                handleAddSubjectOfInterest(
                                                    subject?._id,
                                                    "add"
                                                )
                                            }
                                        >
                                            <Star />
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </div>
                    </div>
                    <div className="flex my-3 w-full overflow-x-scroll sm:overflow-x-auto">
                        <ReCAPTCHA
                            sitekey={
                                process.env
                                    .NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string
                            }
                            onChange={handleReCaptcha}
                            className="mt-5 mb-3"
                        />
                    </div>
                    <Button
                        disabled={reCaptchaStatus ? false : true}
                        type="submit"
                        className="!mt-5 bg-it-secondary hover:bg-it-light-dark font-semibold px-6"
                    >
                        {isSubmitting
                            ? "Updating Profile..."
                            : "Update Profile"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default StudentProfile;
