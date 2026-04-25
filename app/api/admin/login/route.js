import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Missing email or password" }, { status: 400 });
    }

    const snapshot = await adminDb.collection("admins").where("email", "==", email).get();

    if (snapshot.empty) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const adminDoc = snapshot.docs[0];
    const adminData = adminDoc.data();

    const isMatch = await bcrypt.compare(password, adminData.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-prod";
    const token = jwt.sign({ id: adminDoc.id, email: adminData.email, name: adminData.name }, secret, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      data: {
        token,
        admin: {
          id: adminDoc.id,
          email: adminData.email,
          name: adminData.name,
        },
      },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
