import admin from "@/lib/firebaseAdmin";

/**
 * Helpers pour créer / vérifier des cookies de session Firebase.
 */

export const createSessionCookie = async (idToken: string, expiresInMs = 5 * 24 * 60 * 60 * 1000) => {
  if (!admin?.auth) throw new Error("Firebase Admin non initialisé");
  const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: expiresInMs });
  return { sessionCookie, expiresInMs };
};

export const verifySessionCookie = async (sessionCookie: string) => {
  if (!admin?.auth) throw new Error("Firebase Admin non initialisé");
  const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
  return decodedClaims;
};
