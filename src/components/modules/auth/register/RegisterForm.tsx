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
import { registerSchema } from "./registerValidation";
import { useUser } from "@/context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import "./RegisterForm.css";

const RegisterForm = () => {
    const { handleUser } = useUser();
    const [redirect, setRedirect] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(registerSchema),
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
            const modifiedRegisterData = {
                ...data,
                role: "tutor",
            };

            const res = await registerUser(modifiedRegisterData);
            setIsLoading(true);

            if (res?.success) {
                handleUser();
                toast.success("Registration completed successfully!");

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
        <div className="bg-white rounded-xl flex-grow max-w-md w-full p-5 register-form">
            <div className="flex items-center space-x-4">
                <div className="space-y-1 mb-4">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <p className="font-normal text-sm">
                        Fill up the form and be a Tutor!
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
                        {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                </form>
                <p className="text-sm text-gray-600 text-center mt-5 mb-3">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary">
                        Login
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default RegisterForm;
