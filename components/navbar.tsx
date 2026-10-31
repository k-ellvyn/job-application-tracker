import { Briefcase } from "lucide-react";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold text-primary"><Briefcase/>JobHunter</Link>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-gray-700 hover:text-black">Log In</Link>

                    <Link href="/sign-up"><Button>Start for free</Button></Link>
                </div>
            </div>
        </nav>
    );
}