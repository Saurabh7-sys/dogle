import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    const authResult = await verifyUser(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const { uid } = authResult.user;
    const doc = await adminDb.collection("users").doc(uid).get();

    if (!doc.exists) {
      return NextResponse.json({ success: false, error: "User profile not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: doc.data() });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const authResult = await verifyUser(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const { uid } = authResult.user;
    const body = await req.json();
    const { name, phone, dogName, dogAge, dogBreed, vaccinated } = body; 

    const updateData = {
      updatedAt: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (dogName !== undefined) updateData.dogName = dogName;
    if (dogAge !== undefined) updateData.dogAge = dogAge;
    if (dogBreed !== undefined) updateData.dogBreed = dogBreed;
    if (vaccinated !== undefined) updateData.vaccinated = vaccinated;

    await adminDb.collection("users").doc(uid).update(updateData);
    
    const doc = await adminDb.collection("users").doc(uid).get();

    return NextResponse.json({ success: true, data: doc.data() });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
