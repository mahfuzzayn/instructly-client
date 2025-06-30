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
import Image from "next/image";
import logo from "@/assets/images/logo_2.png";

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

    const handleLoadDemoCredentials = (role: "student" | "tutor" | "admin") => {
        if (role === "student") {
            form.setValue(
                "email",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_STUDENT_EMAIL
            );
            form.setValue(
                "password",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_STUDENT_PASSWORD
            );

            toast.success("Demo Student credentials has been filled.");
        } else if (role === "tutor") {
            form.setValue(
                "email",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_TUTOR_EMAIL
            );
            form.setValue(
                "password",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_TUTOR_PASSWORD
            );

            toast.success("Demo Tutor credentials has been filled.");
        } else if (role === "admin") {
            form.setValue(
                "email",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_ADMIN_EMAIL
            );
            form.setValue(
                "password",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_ADMIN_PASSWORD
            );

            toast.success("Demo Admin credentials has been filled.");
        }
    };

    return (
        <div
            className="rounded-xl text-it-medium-dark flex-grow max-w-md w-full p-5 login-form"
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
                    <h1 className="text-xl md:text-2xl font-bold">Login</h1>
                    <p className="font-normal text-md">Welcome back!</p>
                </div>
            </div>
            <div className="mb-4 relative">
                <h2 className="font-semibold">Quick Login (Demo)</h2>
                <div className="flex justify-between gap-3 mt-4">
                    <button
                        onClick={() => handleLoadDemoCredentials("student")}
                        className="w-full bg-transparent text-it-secondary hover:bg-it-secondary hover:text-white font-semibold border-[1px] border-it-secondary px-2 py-1 rounded-md"
                    >
                        Student
                    </button>
                    <button
                        onClick={() => handleLoadDemoCredentials("tutor")}
                        className="w-full bg-transparent text-it-secondary hover:bg-it-secondary hover:text-white transition-all font-semibold border-[1px] border-it-secondary px-2 py-1 rounded-md"
                    >
                        Tutor
                    </button>
                    <button
                        onClick={() => handleLoadDemoCredentials("admin")}
                        className="w-full bg-transparent text-it-secondary hover:bg-it-secondary hover:text-white font-semibold border-[1px] border-it-secondary px-2 py-1 rounded-md"
                    >
                        Admin
                    </button>
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
                                        className="bg-it-light-primary text-black placeholder:text-gray-500"
                                        placeholder="Enter your email"
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
                                        className="bg-it-light-primary text-black placeholder:text-gray-500"
                                        placeholder="Enter your password"
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
                        className="w-full !mt-5 bg-it-secondary hover:bg-it-light-dark"
                    >
                        {isSubmitting ? "Logging..." : "Login"}
                    </Button>
                </form>
                <p className="text-sm text-gray-800 text-center mt-5 mb-3">
                    Don't have any account?
                    <br />
                    <Link
                        href="/signup"
                        className="text-it-medium-dark hover:underline font-medium"
                    >
                        Sign Up
                    </Link>{" "}
                    as a Student or{" "}
                    <Link
                        href="/register"
                        className="text-it-medium-dark hover:underline font-medium"
                    >
                        Register
                    </Link>{" "}
                    as a Tutor
                    <br />
                    <br />
                    Back to{" "}
                    <Link
                        href="/"
                        className="text-it-medium-dark hover:underline font-medium"
                    >
                        Home
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default LoginForm;
