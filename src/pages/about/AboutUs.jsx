import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Loader2 } from 'lucide-react';
import { translations } from '../../locales/translations';
import { useLanguage } from '../../context/LanguageContext';
import WhoWeAreSection from '../../components/layouts/about/WhoWeAreSection';
import TempleDetailsSection from '../../components/layouts/about/TempleDetailsSection';
import TempleManagementSection from '../../components/layouts/about/TempleManagementSection';

export default function AboutUsPage() {
    const { lang } = useLanguage();
    const [contents, setContents] = useState(null);
    const [loading, setLoading] = useState(true);

    const t = translations[lang]?.aboutPage || translations.en.aboutPage;

    useEffect(() => {
        const fetchSiteContents = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
                const res = await fetch(`${baseUrl}/api/contents`);
                const json = await res.json();
                if (json.success && json.data) {
                    setContents(json.data);
                }
            } catch (error) {
                console.error("Failed to load about contents:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSiteContents();
    }, []);

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">

            <div className='bg-maroon-900'>
                <div className="px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4">
                    <nav className="text-xs font-medium text-amber-500 flex items-center gap-1.5">
                        <Link to="/" className="hover:text-amber-600  transition-colors">
                            {t.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <span className="text-cream-200 font-semibold">
                            {t.breadcrumbAbout}
                        </span>
                    </nav>
                </div>

                <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-8 text-center space-y-2 border-b border-stone-200 dark:border-amber-500/20">
                    <h1 className="text-3xl sm:text-4xl font-heading font-bold text-amber-500">
                        {t.pageTitle}
                    </h1>
                    <p className="text-xs sm:text-sm font-sans text-cream-200 max-w-2xl mx-auto">
                        {t.pageSubtitle}
                    </p>
                </header>
            </div>

            <main className=" pb-16">
                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400" />
                    </div>
                ) : (
                    <>
                        <WhoWeAreSection
                            t={t}
                            aboutData={contents?.about}
                            heroImage={contents?.hero?.images?.[0]?.url}
                            lang={lang}
                        />

                        <TempleDetailsSection
                            t={t}
                            aboutData={contents?.about}
                            lang={lang}
                        />

                        <TempleManagementSection
                            t={t}
                            members={contents?.about?.members || []}
                            lang={lang}
                        />
                    </>
                )}
            </main>
        </div>
    );
}