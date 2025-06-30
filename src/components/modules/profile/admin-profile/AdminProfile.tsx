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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { IAdmin } from "@/types";
import ReCAPTCHA from "react-google-recaptcha";
import { reCaptchaTokenVerification } from "@/services/AuthService";
import ImagePreviewer from "@/components/ui/core/ITImageUploader/ImagePreviewer";
import ITImageUploader from "@/components/ui/core/ITImageUploader";
import { adminProfileSchema } from "./adminProfileSchema";
import { updateAdminProfile } from "@/services/Admin";

const AdminProfile = ({ admin }: { admin: IAdmin }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        admin?.profileUrl || null
    );
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(adminProfileSchema),
        defaultValues: {
            name: admin?.user?.name,
            bio: admin?.bio,
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formData = new FormData();
        const modifiedData = {
            ...data,
        };

        formData.append("data", JSON.stringify(modifiedData));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await updateAdminProfile(formData);

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

export default AdminProfile;
