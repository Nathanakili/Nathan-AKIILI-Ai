"use client";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useState } from "react";

type Props = {
  onSuccess?: (user: any) => Promise<void>; // callback from AuthForm to finalize sign-in
};

export default function OAuthButtons({ onSuccess }: Props) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createSessionOnServer = async (user: any) => {
    try {
      if (!user) throw new Error("No user available");
      const idToken = await user.getIdToken();
      const res = await fetch("/api/session/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include",
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error("Session creation failed: " + txt);
      }
      if (onSuccess) await onSuccess(user);
    } catch (err: any) {
      console.error("createSessionOnServer", err);
      setError(err?.message || "Erreur création session");
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoadingProvider("google");
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const cred = await signInWithPopup(auth, provider);
      // create server session cookie
      await createSessionOnServer(cred.user);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erreur Google");
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleGithub = async () => {
    setError(null);
    setLoadingProvider("github");
    try {
      const provider = new GithubAuthProvider();
      provider.addScope("read:user");
      const cred = await signInWithPopup(auth, provider);
      await createSessionOnServer(cred.user);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erreur GitHub");
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleMicrosoft = async () => {
    setError(null);
    setLoadingProvider("microsoft");
    try {
      const provider = new OAuthProvider("microsoft.com");
      provider.addScope("User.Read");
      const cred = await signInWithPopup(auth, provider);
      await createSessionOnServer(cred.user);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erreur Microsoft");
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        <button onClick={handleGoogle} className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8">
          <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
          <span>{loadingProvider === "google" ? "Connexion..." : "Continuer avec Google"}</span>
        </button>

        <button onClick={handleMicrosoft} className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8">
          <img src="/icons/microsoft.svg" alt="Microsoft" className="w-5 h-5" />
          <span>{loadingProvider === "microsoft" ? "Connexion..." : "Continuer avec Microsoft"}</span>
        </button>

        <button onClick={handleGithub} className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8">
          <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5" />
          <span>{loadingProvider === "github" ? "Connexion..." : "Continuer avec GitHub"}</span>
        </button>
      </div>

      {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
    </>
  );
}
