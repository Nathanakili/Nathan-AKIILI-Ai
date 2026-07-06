import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ToolCard({ tool }: { tool: any }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="group bg-[rgba(255,255,255,0.03)] p-4 rounded-xl border border-white/6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {tool.logoUrl ? (
          // next/image require remotePatterns setup; for starter fallback to img if issues
          <img src={tool.logoUrl} alt={tool.name} className="w-12 h-12 rounded" />
        ) : (
          <div className="w-12 h-12 rounded bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-black font-bold">
            {tool.name?.charAt(0)}
          </div>
        )}

        <div>
          <h3 className="font-semibold">{tool.name}</h3>
          <p className="text-sm text-slate-300">{tool.category} · {tool.level}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-200 line-clamp-3">{tool.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs px-2 py-1 bg-white/6 rounded">{tool.popularity ?? 0} ★</span>
        <a className="text-sm text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-3 py-1 rounded" href={tool.websiteUrl} target="_blank" rel="noreferrer">Ouvrir</a>
      </div>
    </motion.article>
  );
}
