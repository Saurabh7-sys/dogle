import { adminAuth } from "./firebaseAdmin";

export async function verifyUser(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Missing or invalid authorization header", status: 401 };
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return { user: decodedToken };
  } catch (error) {
    console.error("User token verification failed:", error);
    return { error: "Invalid token", status: 401 };
  }
}
