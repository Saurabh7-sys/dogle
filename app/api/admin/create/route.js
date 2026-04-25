import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Check if admin already exists
    const existingAdmin = await adminDb.collection("admins").where("email", "==", email).get();
    if (!existingAdmin.empty) {
      return NextResponse.json({ success: false, error: "Admin with this email already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const now = new Date().toISOString();
    const adminData = {
      email,
      name,
      password: hashedPassword,
      createdAt: now,
    };

    const docRef = await adminDb.collection("admins").add(adminData);

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        email,
        name,
        createdAt: now,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ success: false, error: "Internal server error", details: error.message, stack: error.stack }, { status: 500 });
  }
}
