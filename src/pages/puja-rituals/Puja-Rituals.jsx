import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';
import { Sparkles } from 'lucide-react';
import TempleTimeline from '../../components/layouts/puja-rituals/TempleTimeline';
import RitualCard from '../../components/layouts/puja-rituals/RitualCard';
import AnnualCalendarSection from '../../components/layouts/puja-rituals/AnnualCalendarSection';

export default function PujaRitualsPage() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.pujaRitualsPage || translations?.en?.pujaRitualsPage;

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">

            <div className='bg-maroon-900'>
                <div className="px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4">
                    <nav className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                        <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                            {t.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <span className="text-cream-200 font-semibold">
                            {t.breadcrumbPuja}
                        </span>
                    </nav>

                </div>

                <header className=" py-10 px-4 sm:px-6 mt-6 shadow-md  text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="w-3.5 h-3.5" /> {t.mainBadge}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-heading font-bold text-amber-500">
                        {t.mainTitle}
                    </h1>
                    <p className="text-xs sm:text-sm text-cream-200 max-w-2xl mx-auto leading-relaxed">
                        {t.mainSubtitle}
                    </p>
                </header>
            </div>

            <main className=" py-12 space-y-16">

                <section className="space-y-8">
                    <div className="text-center space-y-2">
                        <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                            {t.dailyBadge}
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                            {t.dailyTitle}
                        </h2>
                    </div>

                    <TempleTimeline timelineItems={t.timeline} />
                </section>

                <section className="">
                    <AnnualCalendarSection lang={lang} />
                </section>

                <section className="max-w-6xl mx-auto  space-y-8 pt-6 ">
                    <div className="text-center space-y-2">
                        <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white shadow-sm">
                            {t.ritualsBadge}
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                            {t.ritualsTitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                        {t.ritualsList.map((ritual, idx) => (
                            <RitualCard
                                key={idx}
                                ritual={ritual}
                                btnText={t.btnLearnMore}
                            />
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}