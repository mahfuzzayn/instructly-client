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
    useFieldArray,
    useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { ITutor } from "@/types";
import ReCAPTCHA from "react-google-recaptcha";
import { reCaptchaTokenVerification } from "@/services/AuthService";
import { tutorProfileSchema } from "./tutorProfileSchema";
import { Plus, Trash2 } from "lucide-react";
import ImagePreviewer from "@/components/ui/core/ITImageUploader/ImagePreviewer";
import ITImageUploader from "@/components/ui/core/ITImageUploader";
import { updateTutorProfile } from "@/services/Tutor";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { districts } from "@/constants";

const TutorProfile = ({ tutor }: { tutor: ITutor }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        tutor?.profileUrl || null
    );
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(tutorProfileSchema),
        defaultValues: {
            name: tutor?.user?.name,
            bio: tutor?.bio,
            hourlyRate: tutor?.hourlyRate?.toString(),
            location: {
                area: tutor?.location?.split(",")[0] || "",
                district: tutor?.location?.split(",")[1]?.trim() || "",
            },
            availability: (tutor?.availability || []).map(
                ({ day, startTime, endTime }) => ({
                    day,
                    startTime,
                    endTime,
                })
            ) || [{ day: "", startTime: "", endTime: "" }],
        },
    });

    const {
        append: appendAvailability,
        fields: availabilityFields,
        remove: removeAvailability,
    } = useFieldArray({ control: form.control, name: "availability" });

    const addAvailability = () => {
        if (availabilityFields?.length < 7) {
            appendAvailability({ day: "", startTime: "", endTime: "" });
        }
    };

    const {
        control,
        formState: { isSubmitting, errors },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formData = new FormData();
        const modifiedData = {
            ...data,
            location: `${data?.location?.area}, ${data?.location?.district}`,
            hourlyRate: parseFloat(data?.hourlyRate),
        };

        formData.append("data", JSON.stringify(modifiedData));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await updateTutorProfile(formData);

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
        <div className="rounded-xl flex-grow max-w-md w-full p-5 login-form">
            <div className="flex justify-center mb-5">
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
                        className="w-fit mt-0"
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
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Bio</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="hourlyRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Hourly Rate (Taka)
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
                    <div className="space-y-2">
                        <h2 className="text-sm font-bold">
                            Location (Area, District)
                        </h2>
                        <p className="text-xs font-semibold">
                            Current: {tutor?.location}
                        </p>
                        <div className="flex w-full items-center gap-x-4">
                            <div className="w-full">
                                <FormField
                                    control={form.control}
                                    name="location.area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className="!py-[18px] bg-white text-black"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Controller
                                name="location.district"
                                control={control}
                                rules={{ required: "District is required" }}
                                render={({ field }) => (
                                    <div className="form-item w-full">
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue=""
                                        >
                                            <SelectTrigger className="bg-white w-full">
                                                <SelectValue placeholder="Select a district" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {districts.map(
                                                        (district, idx) => (
                                                            <SelectItem
                                                                key={idx}
                                                                value={
                                                                    district.value
                                                                }
                                                            >
                                                                {district.label}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.location && (
                                            <p className="text-red-500">
                                                {
                                                    errors.location
                                                        .message as string
                                                }
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="border-t border-b py-6 !my-10 space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-primary font-bold text-xl">
                                Availabilities
                            </p>
                            <Button
                                onClick={addAvailability}
                                variant="outline"
                                className="size-10"
                                type="button"
                            >
                                <Plus className="text-primary" />
                            </Button>
                        </div>
                        <div className="space-y-5">
                            {availabilityFields.map(
                                (availabilityField, index) => (
                                    <div
                                        key={availabilityField.id}
                                        className="grid grid-cols-4 gap-x-4 w-full items-center"
                                    >
                                        <FormField
                                            control={form.control}
                                            name={`availability.${index}.day`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold">
                                                        Day {index + 1}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="bg-white text-black"
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        ></FormField>
                                        <FormField
                                            control={form.control}
                                            name={`availability.${index}.startTime`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold">
                                                        Start Time {index + 1}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="bg-white text-black"
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        ></FormField>
                                        <FormField
                                            control={form.control}
                                            name={`availability.${index}.endTime`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold">
                                                        End Time {index + 1}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="bg-white text-black"
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        ></FormField>
                                        <Button
                                            className="max-w-12 hover:bg-it-medium-dark mt-auto"
                                            onClick={() =>
                                                removeAvailability(index)
                                            }
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
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
                        {isSubmitting
                            ? "Updating Profile..."
                            : "Update Profile"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default TutorProfile;
