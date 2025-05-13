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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IStudent, ITutor } from "@/types";
import ReCAPTCHA from "react-google-recaptcha";
import { reCaptchaTokenVerification } from "@/services/AuthService";
import { giveReviewSchema } from "./giveReviewValidation";
import { giveReview, ReviewFormData } from "@/services/Review";
import { Textarea } from "@/components/ui/textarea";

const GiveReviewForm = ({
    student,
    tutors,
}: {
    student: IStudent;
    tutors: ITutor[];
}) => {
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(giveReviewSchema),
    });

    const {
        control,
        formState: { isSubmitting, errors },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Giving review...");

        try {
            const reviewData: ReviewFormData = {
                tutor: data?.tutor,
                student: student?._id as string,
                rating: parseFloat(data?.rating) as number,
                comment: data?.comment,
            };

            if (reCaptchaStatus) {
                const res = await giveReview(reviewData);

                if (res.success) {
                    toast.success(res?.message, { id: toastId });

                    form.reset();
                } else {
                    toast.warning(res?.message, { id: toastId });
                }
            }
        } catch (error: any) {
            toast.error("Failed to give a review", { id: toastId });
            return Error(error);
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
        <div className="mx-auto rounded-xl flex-grow max-w-md w-full p-5 login-form">
            <div className="flex items-center space-x-4">
                <div className="space-y-1 mb-4">
                    <h1 className="text-2xl font-bold">Give a Review</h1>
                    <p className="font-normal text-sm">
                        Fill up the form and give your favorite tutor an
                        appreciation!
                    </p>
                </div>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <Controller
                        name="tutor"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <div className="form-item">
                                <label className="font-bold">Tutor</label>
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
                                            {tutors.map((tutor, idx) => (
                                                <SelectItem
                                                    key={idx}
                                                    value={tutor?._id}
                                                >
                                                    {tutor?.user?.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.tutor && (
                                    <p className="text-red-500">
                                        {errors.tutor.message as string}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Rating
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={5}
                                        className="bg-white text-black"
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
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Comment
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-white text-black"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <div className="flex my-3 w-full">
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
                        {isSubmitting ? "Giving..." : "Give"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default GiveReviewForm;
