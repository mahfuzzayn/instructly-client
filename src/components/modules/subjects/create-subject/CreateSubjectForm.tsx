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
import { createSubjectSchema } from "./createSubjectValidation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { gradeLevels, subjectCategories } from "@/constants";
import { ITutor } from "@/types";
import ReCAPTCHA from "react-google-recaptcha";
import { reCaptchaTokenVerification } from "@/services/AuthService";
import { createSubject } from "@/services/Subject";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CreateSubjectForm = ({ tutor }: { tutor: ITutor }) => {
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(createSubjectSchema),
        defaultValues: {
            name: undefined,
            category: "Science",
            gradeLevel: "High School",
        },
    });

    const {
        control,
        formState: { isSubmitting, errors },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const subjectData = {
                tutor: tutor?._id,
                ...data,
            };

            if (reCaptchaStatus) {
                const res = await createSubject(subjectData);

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
        <div className="mx-auto rounded-xl flex-grow max-w-md w-full p-5 pt-10 login-form">
            <Link href={`/tutor/dashboard/subjects`}>
                <Button className="hover:bg-it-light-dark font-semibold mt-5 mb-10">
                    <ArrowLeft /> Subjects
                </Button>
            </Link>
            <div className="flex items-center space-x-4">
                <div className="space-y-1 mb-4">
                    <h1 className="text-2xl font-bold">Create a Subject</h1>
                    <p className="font-normal text-sm">
                        Fill up the form and make your subject ready to be
                        pursued!
                    </p>
                </div>
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
                                        className="bg-white text-black"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <div className="form-item">
                                <label className="font-bold">Category</label>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue=""
                                >
                                    <SelectTrigger className="mt-2 bg-white w-full">
                                        <SelectValue placeholder="Select a grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {subjectCategories.map(
                                                (category, idx) => (
                                                    <SelectItem
                                                        key={idx}
                                                        value={category.value}
                                                    >
                                                        {category.label}
                                                    </SelectItem>
                                                )
                                            )}
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
                    <Controller
                        name="gradeLevel"
                        control={control}
                        rules={{ required: "Grade level is required" }}
                        render={({ field }) => (
                            <div className="form-item">
                                <label className="font-bold">Grade Level</label>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue=""
                                >
                                    <SelectTrigger className="mt-2 bg-white w-full">
                                        <SelectValue placeholder="Select a grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {gradeLevels.map((level, idx) => (
                                                <SelectItem
                                                    key={idx}
                                                    value={level.value}
                                                >
                                                    {level.label}
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
                    <div className="flex my-3 w-full overflow-x-scroll sm:overflow-x-auto">
                        <ReCAPTCHA
                            sitekey={
                                process.env
                                    .NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string
                            }
                            onChange={handleReCaptcha}
                            className="mx-auto mt-5 mb-3"
                        />
                    </div>
                    <Button
                        disabled={reCaptchaStatus ? false : true}
                        type="submit"
                        className="w-full !mt-5 hover:bg-it-light-dark"
                    >
                        {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateSubjectForm;
