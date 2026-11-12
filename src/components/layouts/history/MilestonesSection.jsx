import { Calendar, Award, Sparkles } from 'lucide-react';

export default function MilestonesSection({ t }) {
    return (
        <div className="py-10 px-2">
            <div className='max-w-6xl mx-auto'>
                <div className="text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                        Legacy & Celebrations
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#7c1d1d] dark:text-amber-100">
                        {t.milestonesTitle}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">

                    <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/20 shadow-sm space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                            {t.m38Badge}
                        </div>
                        <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        <h4 className="text-base font-bold text-maroon-800 font-heading dark:text-amber-100">{t.m38Title}</h4>
                        <p className="text-xs sm:text-sm text-stone-600 font-sans dark:text-cream-200/70 leading-relaxed">
                            {t.m38Desc}
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/20 shadow-sm space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                            {t.m39Badge}
                        </div>
                        <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        <h4 className="text-base font-bold text-maroon-800 font-heading dark:text-amber-100">{t.m39Title}</h4>
                        <p className="text-xs sm:text-sm text-stone-600 font-sans dark:text-cream-200/70 leading-relaxed">
                            {t.m39Desc}
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/20 shadow-sm space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-maroon-800 text-amber-200 text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                            {t.traditionsBadge}
                        </div>
                        <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        <h4 className="text-base font-bold text-maroon-800 font-heading dark:text-amber-100">{t.traditionsTitle}</h4>
                        <p className="text-xs sm:text-sm text-stone-600 font-sans dark:text-cream-200/70 leading-relaxed">
                            {t.traditionsDesc}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}