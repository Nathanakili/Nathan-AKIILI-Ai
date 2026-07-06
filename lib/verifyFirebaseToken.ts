import admin from "@/lib/firebaseAdmin";

/**
 * Exemple d'utilisation dans une API route (app/api/protected/route.ts)
 * - Récupérez le token depuis l'en-tête Authorization: Bearer <idToken>
 * - Vérifiez via admin.auth().verifyIdToken(idToken)
 */
export async function verifyIdToken(idToken?: string | null) {
  if (!idToken) throw new Error("No token provided");
  if (!admin?.auth) throw new Error("Firebase Admin not initialized");
  const decoded = await admin.auth().verifyIdToken(idToken);
  return decoded;
}
