import { ArrowRight, Flame } from 'lucide-react';

export default function RitualCard({ ritual, btnText }) {
    return (
        <div className="flex flex-col items-center bg-white dark:bg-[#1a0408] rounded-t-full rounded-b-3xl p-6 pt-10 shadow-sm  transition-all group text-center">

            <div className="w-12 h-12 rounded-full bg-amber-600/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
            </div>

            <h4 className="text-base font-serif font-bold text-stone-900 dark:text-amber-100 mb-2">
                {ritual.name}
            </h4>

            <p className="text-xs text-stone-600 dark:text-cream-200/70 leading-relaxed mb-6 line-clamp-3">
                {ritual.desc}
            </p>

            <button
                type="button"
                className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer"
            >
                {btnText || "Learn more"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}