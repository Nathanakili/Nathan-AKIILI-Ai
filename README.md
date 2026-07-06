# Nathan Akili AI — Starter

Stack : Next.js (App Router) + TypeScript + Tailwind CSS + Firebase (Auth + Firestore) + Firebase Admin

Pré-requis :
- Node 18+
- Un projet Firebase (console.firebase.google.com)
- Un service account JSON (Project Settings → Service accounts → Generate new private key)

Variables d'environnement requises :
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- FIREBASE_SERVICE_ACCOUNT_KEY  (contenu du JSON du service account encodé en base64)

Exemple (macOS / Linux) :
export NEXT_PUBLIC_FIREBASE_API_KEY="..."
export NEXT_PUBLIC_FIREBASE_PROJECT_ID="my-project"
export FIREBASE_SERVICE_ACCOUNT_KEY="$(cat serviceAccountKey.json | base64)"

Installation :
1. npm install
2. npm run dev

Seed Firestore (server-side) :
- Assurez-vous que FIREBASE_SERVICE_ACCOUNT_KEY est défini.
- npm run seed

Notes & recommandations :
- Pour recherche full-text et instantanée, synchronisez Firestore vers Algolia via Cloud Functions ou utilisez ElasticSearch.
- Protégez les endpoints sensibles côté serveur en vérifiant le token Firebase (via Firebase Admin).
- Intégrer OAuth providers (Google/Microsoft/GitHub) via Firebase Auth console.
- Ajoutez règles Firestore pour écrire uniquement par admins (custom claims).
