import { motion } from 'framer-motion';

export default function Hero(){
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Nathan Akili AI — Toute l'intelligence artificielle au même endroit.
          </h1>
          <p className="mt-6 text-lg text-slate-200 max-w-xl">
            Accédez aux meilleurs outils d'IA pour étudiants, chercheurs, entrepreneurs et entreprises depuis une seule plateforme.
          </p>
          <div className="mt-8 flex gap-4">
            <a className="btn-primary" href="/signup">Commencer gratuitement</a>
            <a className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/10 text-sm" href="#tools">Explorer les IA</a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full lg:w-1/2">
          <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-white/6">
            {/* Remplacez par un Lottie animé ou SVG */}
            <div className="w-full h-64 flex items-center justify-center text-slate-300">
              Animation robot / réseaux neuronaux (à remplacer)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
