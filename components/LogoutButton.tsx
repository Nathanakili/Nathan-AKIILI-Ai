"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Sign out client-side Firebase auth (clears client token)
      await signOut(auth).catch(() => null);

      // Call server endpoint to clear session cookie and revoke tokens
      await fetch("/api/session/logout", { method: "POST" });

      // Redirect to login
      router.push("/login");
    } catch (err) {
      console.error("logout error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} className="px-3 py-2 rounded-lg bg-white/6 hover:bg-white/8">
      {loading ? "Déconnexion..." : "Se déconnecter"}
    </button>
  );
}
