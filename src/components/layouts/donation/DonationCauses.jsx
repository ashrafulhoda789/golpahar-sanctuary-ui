import { Utensils, Flame, Landmark, CheckCircle2 } from 'lucide-react';

export default function DonationCauses({ t, selectedCause, onSelectCause }) {
    const icons = {
        annadan: Utensils,
        puja: Flame,
        development: Landmark
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                {t.causesTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {t.causes.map((cause) => {
                    const Icon = icons[cause.id] || Flame;
                    const isSelected = selectedCause === cause.id;

                    return (
                        <button
                            key={cause.id}
                            type="button"
                            onClick={() => onSelectCause(cause.id)}
                            className={`text-left p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between relative ${isSelected
                                    ? 'bg-amber-500/15 dark:bg-amber-500/20 border-amber-600 shadow-md'
                                    : 'bg-white dark:bg-[#1a0408] border-stone-200 dark:border-amber-500/20 hover:border-amber-500/50'
                                }`}
                        >
                            {isSelected && (
                                <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 absolute top-4 right-4" />
                            )}

                            <div className="w-10 h-10 rounded-2xl bg-amber-600/15 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3">
                                <Icon className="w-5 h-5" />
                            </div>

                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-amber-100 mb-1">
                                    {cause.title}
                                </h3>
                                <p className="text-xs text-stone-600 dark:text-cream-200/75 leading-relaxed">
                                    {cause.desc}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}