import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const idToken = body?.idToken;
    if (!idToken) return NextResponse.json({ error: "idToken missing" }, { status: 400 });

    const { sessionCookie, expiresInMs } = await createSessionCookie(idToken);
    const res = NextResponse.json({ ok: true });

    // Set cookie (HttpOnly) — maxAge in seconds
    res.cookies.set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: Math.floor(expiresInMs / 1000),
    });

    return res;
  } catch (err: any) {
    console.error("session/login error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
