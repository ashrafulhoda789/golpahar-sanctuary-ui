import { X, Calendar } from 'lucide-react';

export default function DeityDetailModal({ deity, isOpen, onClose, lang }) {
    if (!isOpen || !deity) return null;

    const name = lang === 'bn' ? deity.name_bn : deity.name_en;
    const desc = lang === 'bn' ? deity.desc_bn : deity.desc_en;
    const birth = lang === 'bn' ? deity.birth_bn : deity.birth_en;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-[#fdfbf7] dark:bg-[#23060b] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full bg-stone-200/80 dark:bg-maroon-900 text-stone-700 dark:text-amber-300 hover:scale-105 transition-all cursor-pointer"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-28 h-32 p-1 rounded-t-full border-2 border-amber-500/60 bg-amber-50 dark:bg-[#1a0408] shadow-md">
                        <div className="w-full h-full rounded-t-full overflow-hidden bg-amber-600/20">
                            <img
                                src={deity.image || "https://i.ibb.co.com/ZpDhhp2K/temple3.webp"}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#7c1d1d] dark:text-amber-100">
                            {name}
                        </h3>
                        {birth && (
                            <div className="inline-flex items-center gap-1.5 mt-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                                <Calendar className="w-3.5 h-3.5" /> {birth}
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-h-60 overflow-y-auto pr-1 text-xs sm:text-sm text-stone-700 dark:text-cream-200/90 leading-relaxed space-y-3">
                    <p>{desc}</p>
                </div>

                <div className="pt-2 text-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}