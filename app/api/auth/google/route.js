import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Missing authorization header" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();
    
    let userData;
    const now = new Date().toISOString();

    if (!userDoc.exists) {
      userData = {
        uid,
        name: name || "",
        email: email || "",
        photoURL: picture || "",
        phone: "",
        dogName: "",
        dogAge: "",
        dogBreed: "",
        vaccinated: false,
        createdAt: now,
        updatedAt: now,
      };
      await userRef.set(userData);
    } else {
      userData = userDoc.data();
      await userRef.update({
        updatedAt: now,
      });
      userData.updatedAt = now;
    }

    return NextResponse.json({ success: true, data: userData });
  } catch (error) {
    console.error("Error with Google auth:", error);
    return NextResponse.json({ success: false, error: "Invalid token or server error" }, { status: 401 });
  }
}
