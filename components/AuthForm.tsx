"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import OAuthButtons from "./OAuthButtons";

async function createSessionCookieOnServer(idToken: string) {
  // Appelle l'endpoint server-side qui crée le cookie de session HttpOnly
  const res = await fetch("/api/session/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error("Session creation failed: " + text);
  }
  return res.json();
}

export default function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    // Si l'utilisateur est déjà connecté côté client, on peut rediriger vers le dashboard
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsub();
  }, [router]);

  const finalizeSignIn = async (user: any) => {
    // Récupère idToken et appelle l'API server pour créer la session cookie
    try {
      const idToken = await user.getIdToken();
      await createSessionCookieOnServer(idToken);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("finalizeSignIn error", err);
      setError(err?.message || "Impossible de créer la session serveur");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      await sendEmailVerification(cred.user);
      setInfo("Inscription réussie. Un email de vérification a été envoyé.");

      // Créer la session serveur pour SSR
      await finalizeSignIn(cred.user);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // Créer la session serveur pour SSR
      await finalizeSignIn(cred.user);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-[rgba(255,255,255,0.02)] backdrop-blur-md rounded-xl border border-white/6">
      <h1 className="text-2xl font-semibold mb-2">
        {mode === "signup" ? "Créer un compte" : "Se connecter"}
      </h1>
      <p className="text-sm text-slate-300 mb-4">
        {mode === "signup"
          ? "Inscrivez-vous pour sauvegarder vos favoris, historique et recommandations."
          : "Connectez-vous pour accéder à votre tableau de bord et favoris."}
      </p>

      <OAuthButtons onSuccess={finalizeSignIn} />

      <div className="my-4 text-center text-slate-400">ou</div>

      <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="space-y-3">
        {mode === "signup" && (
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Nom affiché"
            className="w-full px-3 py-2 rounded-lg bg-white/6 border border-white/6 focus:outline-none"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="w-full px-3 py-2 rounded-lg bg-white/6 border border-white/6 focus:outline-none"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          type="password"
          required
          minLength={6}
          className="w-full px-3 py-2 rounded-lg bg-white/6 border border-white/6 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-black font-semibold"
        >
          {loading ? "Traitement..." : mode === "signup" ? "S'inscrire" : "Se connecter"}
        </button>
      </form>

      {error && <div className="mt-3 text-sm text-red-400">{error}</div>}
      {info && <div className="mt-3 text-sm text-green-400">{info}</div>}

      <div className="mt-4 text-sm text-slate-300">
        {mode === "signup" ? (
          <span>
            Déjà un compte ? <a href="/login" className="text-[var(--primary)]">Se connecter</a>
          </span>
        ) : (
          <span>
            Pas encore de compte ? <a href="/signup" className="text-[var(--primary)]">S'inscrire</a>
          </span>
        )}
      </div>
    </div>
  );
}
