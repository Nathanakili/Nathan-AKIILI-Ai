import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';

export async function GET(request: Request) {
  try {
    if (!admin?.firestore) {
      return NextResponse.json({ tools: [], error: 'Firebase Admin not initialized' }, { status: 500 });
    }

    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';
    const category = url.searchParams.get('category') || null;

    let ref = admin.firestore().collection('tools');

    if (category) {
      ref = ref.where('category', '==', category) as FirebaseFirestore.Query;
    }

    if (q) {
      // simple prefix search on 'name' (requires index on name). For production use Algolia or Elastic.
      ref = ref.orderBy('name').startAt(q).endAt(q + '\uf8ff').limit(50) as unknown as FirebaseFirestore.Query;
    } else {
      ref = ref.orderBy('popularity', 'desc').limit(50) as unknown as FirebaseFirestore.Query;
    }

    const snap = await ref.get();
    const tools = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ tools });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ tools: [], error: String(err) }, { status: 500 });
  }
}
