import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export async function proxy(req: NextRequest) {
    const session = await getSession();

    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
    if (isDashboardPage && !session?.user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const isLoginPage = req.nextUrl.pathname.startsWith("/login");
    const isSignUpPage = req.nextUrl.pathname.startsWith("/sign-up");

    if (session?.user && (isLoginPage || isSignUpPage)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}