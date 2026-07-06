import { useState } from 'react';

export default function SearchBar(){
  const [q, setQ] = useState('');
  const doSearch = async (e?: any) => {
    if (e) e.preventDefault();
    const res = await fetch(`/api/tools/search?q=${encodeURIComponent(q)}`);
    // Ici on pourrait émettre un event ou utiliser context pour mettre à jour la liste
    console.log(await res.json());
  }

  return (
    <form onSubmit={doSearch} className="flex items-center gap-2">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher une IA, catégorie, usage..." className="px-3 py-2 rounded-lg bg-white/6 border border-white/6 focus:outline-none" />
      <button onClick={doSearch} className="px-3 py-2 rounded-lg bg-[var(--primary)] text-black font-semibold">Rechercher</button>
    </form>
  )
}
