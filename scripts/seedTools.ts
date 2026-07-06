/**
 * Usage:
 *  - Set FIREBASE_SERVICE_ACCOUNT_KEY (base64 JSON) and FIREBASE_PROJECT_ID env vars
 *  - npx ts-node scripts/seedTools.ts
 */
import admin from 'firebase-admin';

const serviceAccountB64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountB64) {
  console.error('Please set FIREBASE_SERVICE_ACCOUNT_KEY env (base64 JSON)');
  process.exit(1);
}
const serviceAccount = JSON.parse(Buffer.from(serviceAccountB64, 'base64').toString());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const seed = async () => {
  const tools = [
    {
      name: 'ChatGPT',
      slug: 'chatgpt',
      logoUrl: '',
      websiteUrl: 'https://chat.openai.com',
      description: 'Assistant conversationnel avancé par OpenAI.',
      category: 'IA conversationnelles',
      level: 'Intermédiaire',
      tags: ['chat', 'nlp'],
      languages: ['Français', 'Anglais'],
      hasApi: true,
      pricing: { tiers: ['free','paid'] },
      popularity: 1000,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      name: 'Midjourney',
      slug: 'midjourney',
      logoUrl: '',
      websiteUrl: 'https://www.midjourney.com',
      description: 'Génération d\'images via prompts.',
      category: 'Génération d\'images',
      level: 'Expert',
      tags: ['images','art'],
      languages: ['Anglais'],
      hasApi: false,
      pricing: { tiers: ['paid'] },
      popularity: 850,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    // Ajoutez d'autres outils...
  ];

  for (const t of tools) {
    const docRef = db.collection('tools').doc(t.slug);
    await docRef.set(t);
    console.log('Seeded', t.name);
  }
  console.log('Seed finished');
  process.exit(0);
};

seed().catch(e => { console.error(e); process.exit(1); });
