import admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!admin.apps.length) {
  if (!serviceAccount) {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin will not be initialized in server.");
  } else {
    const parsed = JSON.parse(Buffer.from(serviceAccount, 'base64').toString());
    admin.initializeApp({
      credential: admin.credential.cert(parsed as admin.ServiceAccount),
    });
  }
}

export default admin;
