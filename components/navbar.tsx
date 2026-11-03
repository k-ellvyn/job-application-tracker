"use client";

import { Briefcase } from "lucide-react";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "@/lib/auth/auth-client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { useRouter } from "next/navigation";

export default function Navbar() {
    const session = useSession();
    const user = session.data?.user;

    const router = useRouter();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold text-primary"><Briefcase/>JobHunter</Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <Avatar className="w-9 h-9">
                                        <AvatarFallback className="bg-primary text-white">
                                            {user.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel className="font-normal mb-2">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => {signOut().then((result) => {if (!result.error) {
                                            router.push("/login");
                                        } else {
                                            alert("Error in logging out.");
                                        }});}}>Log Out</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-700 hover:text-black">Log In</Link>

                            <Link href="/sign-up"><Button>Start for free</Button></Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}