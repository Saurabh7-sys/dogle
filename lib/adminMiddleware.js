import jwt from "jsonwebtoken";

export async function verifyAdmin(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: "Missing or invalid authorization header", status: 401 };
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const secret = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-prod";
    const decoded = jwt.verify(token, secret);
    return { admin: decoded };
  } catch (error) {
    console.error("Admin token verification failed:", error);
    return { error: "Invalid admin token", status: 401 };
  }
}
