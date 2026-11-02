"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";

import { signUp } from "@/lib/auth/auth-client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        
        setError(null);
        setIsLoading(true);

        try {
            const result = await signUp.email({
                name,
                email,
                password
            });

            if (result.error) {
                setError(result.error.message ?? "Failed to sign up.");
            }
            else {
                router.push("/dashboard");
            }
        } catch (e) {
            setError("An unexpected error occured.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-black">Sign Up</CardTitle>
                    <CardDescription className="text-gray-600">Create an account to start tracking your job applications</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardContent className="space-y-4">
                        {
                            error && (
                                <p className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                    {error}
                                </p>
                            )
                        }
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name" onChange={(e) => {setName(e.target.value);}} required minLength={2} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="example@email.com" type="email" onChange={(e) => {setEmail(e.target.value);}} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="" type="password" onChange={(e) => {setPassword(e.target.value);}} required minLength={8} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button size="lg" className="w-full" type="submit" disabled={isLoading}>{isLoading ? "Creating account..." : "Sign Up"}</Button>
                        <p>Already have an account? <Link href="/login" className="underline hover:no-underline">Log in</Link></p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}