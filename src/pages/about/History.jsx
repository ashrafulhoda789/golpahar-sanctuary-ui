import HistoryFooterCta from '../../components/layouts/history/HistoryFooterCta';
import HistoryHeader from '../../components/layouts/history/HistoryHeader';
import LocationSanctuarySection from '../../components/layouts/history/LocationSanctuarySection';
import MilestonesSection from '../../components/layouts/history/MilestonesSection';
import VisitorInfoSection from '../../components/layouts/history/VisitorInfoSection';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';


export default function HistoryPage() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.historyPage || translations?.en?.historyPage;

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">
            <HistoryHeader t={t} />


            <main className="pb-20 space-y-12">
                <LocationSanctuarySection t={t} />

                <VisitorInfoSection t={t} />

                <MilestonesSection t={t} />

                <HistoryFooterCta t={t} />
            </main>
        </div>
    );
}