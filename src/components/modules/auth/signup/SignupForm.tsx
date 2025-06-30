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
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import {
    reCaptchaTokenVerification,
    registerUser,
} from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signupSchema } from "./signupValidation";
import { useUser } from "@/context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import "./SignupForm.css";
import Image from "next/image";
import logo from "@/assets/images/logo_2.png";

const SignupForm = () => {
    const { handleUser } = useUser();
    const [redirect, setRedirect] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(signupSchema),
    });

    const { setIsLoading } = useUser();

    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setRedirect(searchParams.get("redirectPath"));
    }, []);

    const router = useRouter();

    const {
        formState: { isSubmitting },
    } = form;

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const modifiedSignupData = {
                ...data,
                role: "student",
            };

            const res = await registerUser(modifiedSignupData);
            setIsLoading(true);

            if (res?.success) {
                handleUser();
                toast.success("Sign Up completed successfully!");

                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/");
                }
            } else {
                toast.error(res?.message);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div
            className="rounded-xl text-it-medium-dark flex-grow max-w-md w-full p-5 signup-form"
            style={{
                backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
            }}
        >
            <Link href="/" className="flex items-center gap-x-2">
                <Image
                    src={logo}
                    height={40}
                    width={40}
                    alt="Instructly Logo"
                />
                <h2 className="text-2xl md:text-3xl text-it-medium-dark font-extrabold">
                    Instructly
                </h2>
            </Link>
            <div className="flex items-center space-x-4 mt-4">
                <div className="space-y-1 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold">Sign Up</h1>
                    <p className="font-normal text-md">
                        Fill up the form and be a Student!
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
                                        {...field}
                                        className="bg-it-light-primary text-black placeholder:text-gray-500"
                                        placeholder="Enter your name"
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        {...field}
                                        className="bg-it-light-primary text-black placeholder:text-gray-500"
                                        placeholder="Enter your email"
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        {...field}
                                        className="bg-it-light-primary text-black placeholder:text-gray-500"
                                        placeholder="Enter your password"
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
                            className="mx-auto mt-5 mb-3"
                        />
                    </div>
                    <Button
                        disabled={reCaptchaStatus ? false : true}
                        type="submit"
                        className="w-full !mt-5 bg-it-secondary hover:bg-it-light-dark"
                    >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </Button>
                </form>
                <p className="text-sm text-gray-800 text-center mt-5 mb-3">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-it-medium-dark hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default SignupForm;
