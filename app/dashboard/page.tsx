import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import admin from "@/lib/firebaseAdmin";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  // Récupère cookie de session
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    // Non authentifié => redirection vers /login
    redirect("/login");
  }

  try {
    // Vérifie le cookie via Firebase Admin; si invalide -> exception -> redirige
    const decoded = await admin.auth().verifySessionCookie(session as string, true);
    const displayName = (decoded.name as string) || (decoded.email as string) || "Utilisateur";

    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <LogoutButton />
        </div>

        <section className="bg-[rgba(255,255,255,0.02)] p-6 rounded-xl border border-white/6">
          <h2 className="text-xl font-semibold">Bienvenue, {displayName}</h2>
          <p className="text-slate-300 mt-2">
            Ici vous trouverez vos favoris, historique et recommandations personnalisées (exemples).
          </p>

          {/* Exemple de contenu privé */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[rgba(255,255,255,0.01)] rounded">
              <h3 className="font-semibold">Favoris</h3>
              <p className="text-sm text-slate-300 mt-2">Votre liste d'outils sauvegardés apparaîtra ici.</p>
            </div>
            <div className="p-4 bg-[rgba(255,255,255,0.01)] rounded">
              <h3 className="font-semibold">Historique</h3>
              <p className="text-sm text-slate-300 mt-2">Vos recherches et interactions récentes.</p>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (err) {
    // Cookie expiré ou invalide -> rediriger vers login
    console.warn("Session invalid or expired:", err);
    redirect("/login");
  }
}
