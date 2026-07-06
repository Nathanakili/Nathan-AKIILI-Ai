import { NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    // Lire cookie session depuis en-têtes
    const cookieHeader = req.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.split(";").map(s => s.trim()).find(s => s.startsWith("session="));
    const session = sessionMatch ? sessionMatch.split("session=")[1] : null;

    if (session && admin?.auth) {
      try {
        const decoded = await admin.auth().verifySessionCookie(session, true);
        // Révoquer refresh tokens pour forcer invalider session côté client
        await admin.auth().revokeRefreshTokens(decoded.uid);
      } catch (e) {
        // ignore verify errors — still clear cookie
        console.warn("verifySessionCookie failed during logout:", e);
      }
    }

    const res = NextResponse.json({ ok: true });
    // Clear cookie
    res.cookies.set({
      name: "session",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 0,
    });

    return res;
  } catch (err: any) {
    console.error("session/logout error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
