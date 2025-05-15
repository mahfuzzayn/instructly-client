/* eslint-disable react/no-unescaped-entities */
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
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema } from "./loginValidation";
import { useUser } from "@/context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import "./LoginForm.css";

const LoginForm = () => {
    const { handleUser } = useUser();
    const [redirect, setRedirect] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(loginSchema),
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
            const res = await loginUser(data);
            setIsLoading(true);

            if (res?.success) {
                handleUser();
                toast.success(res?.message);

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
        <div className="bg-white rounded-xl flex-grow max-w-md w-full p-5 login-form">
            <div className="flex items-center space-x-4">
                <div className="space-y-1 mb-4">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="font-normal text-sm">Welcome back!</p>
                </div>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                        {isSubmitting ? "Logging..." : "Login"}
                    </Button>
                </form>
                <p className="text-sm text-gray-600 text-center mt-5 mb-3">
                    Don't have any account?
                    <br />
                    <Link href="/signup" className="text-primary">
                        Sign Up
                    </Link>{" "}
                    as a Student or{" "}
                    <Link href="/register" className="text-primary">
                        Register
                    </Link>{" "}
                    as a Tutor
                    <br />
                    <br />
                    Back to{" "}
                    <Link href="/" className="text-primary">
                        Home
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default LoginForm;
