import Hero from '@/components/Hero';
import ToolCard from '@/components/ToolCard';
import SearchBar from '@/components/SearchBar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tools, setTools] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/tools/search')
      .then(r => r.json())
      .then(d => setTools(d.tools || []))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Hero />
      <section id="tools" className="max-w-6xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Les meilleures IA</h2>
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
