import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyAdmin } from "@/lib/adminMiddleware";

export async function GET(req) {
  try {
    const authResult = await verifyAdmin(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const snapshot = await adminDb.collection("users").orderBy("createdAt", "desc").get();
    
    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
