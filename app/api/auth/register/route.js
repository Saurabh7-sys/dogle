import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const { email, password, name, phone } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    const now = new Date().toISOString();
    const userData = {
      uid: userRecord.uid,
      name,
      email,
      photoURL: "",
      phone: phone || "",
      createdAt: now,
      updatedAt: now,
    };

    await adminDb.collection("users").doc(userRecord.uid).set(userData);

    return NextResponse.json({ success: true, data: userData }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}
