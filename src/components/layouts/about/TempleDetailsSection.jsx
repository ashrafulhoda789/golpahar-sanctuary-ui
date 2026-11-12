import { Flame, Sparkles, HeartHandshake } from 'lucide-react';

export default function TempleDetailsSection({ t, aboutData, lang }) {
    const overviewText = (lang === 'bn' ? aboutData?.committeeOverview_bn : aboutData?.committeeOverview_en)
        || aboutData?.committeeOverview
        || t.committeeOverviewFallback;

    const icons = [Flame, Sparkles, HeartHandshake];

    return (
        <section className="py-10 border-stone-200/80 dark:border-amber-500/20 bg-cream-200 dark:bg-[#1a0408]/60">
            <div className='max-w-6xl mx-auto py-12 md:py-16 bg-cream-100 dark:bg-maroon-800  shadow-2xl rounded-3xl px-6 sm:px-10 my-6'>
                <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
                    <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                        {t.detailsBadge}
                    </span>
                    <h2 className="text-2xl sm:text-5xl font-heading font-bold text-[#7c1d1d] dark:text-amber-100">
                        {t.detailsTitle}
                    </h2>
                    <p className="text-sm text-stone-600 dark:text-cream-200/80 leading-relaxed">
                        {overviewText}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {t.pillars.map((pillar, idx) => {
                        const IconComponent = icons[idx % icons.length];
                        return (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-white dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/25 shadow-sm hover:border-amber-500/50 transition-all space-y-3"
                            >
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold font-heading text-stone-900 dark:text-amber-100">
                                    {pillar.title}
                                </h3>
                                <p className="text-xs font-sans text-stone-600 dark:text-cream-200/70 leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}