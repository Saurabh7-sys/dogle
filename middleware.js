import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (!token) {
    if (isLoginPage) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret-do-not-use-in-prod");
    await jwtVerify(token, secret);
    
    // If they have a valid token and try to go to /admin/login, send them to /admin
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    
    return NextResponse.next();
  } catch (err) {
    console.error("JWT Verification failed:", err);
    // Invalid token, delete it and redirect to login
    const response = NextResponse.redirect(new URL("/admin/login", req.url));
    response.cookies.delete("admin_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
