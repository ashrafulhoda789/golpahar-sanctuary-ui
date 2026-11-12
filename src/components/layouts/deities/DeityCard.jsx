import { ArrowRight } from 'lucide-react';

export default function DeityCard({ deity, onDetailsClick, lang }) {
    const name = lang === 'bn' ? deity.name_bn : deity.name_en;
    const shortDesc = lang === 'bn' ? deity.shortDesc_bn : deity.shortDesc_en;
    

    return (
        <div className="flex flex-col items-center bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 shadow-sm hover:border-amber-500/60 transition-all group">
            {/* Arch Shape Avatar */}
            <div className="w-28 h-32 p-1.5 rounded-t-full border-2 border-amber-500/60 dark:border-amber-400/50 bg-amber-50/50 dark:bg-[#23060b] shadow-sm group-hover:scale-105 transition-transform mb-4">
                <div className="w-full h-full rounded-t-full overflow-hidden bg-amber-600/20 flex items-center justify-center">
                    <img
                        src={deity.image || "https://i.ibb.co.com/ZpDhhp2K/temple3.webp"}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <h4 className="text-base font-heaidng font-bold text-stone-900 dark:text-amber-100 text-center mb-1">
                {name}
            </h4>

            <p className="text-[11px] sm:text-xs text-stone-600 dark:text-cream-200/70 text-center line-clamp-2 mb-4">
                {shortDesc}
            </p>

            <button
                onClick={() => onDetailsClick(deity)}
                className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer"
            >
                View Details <ArrowRight className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}