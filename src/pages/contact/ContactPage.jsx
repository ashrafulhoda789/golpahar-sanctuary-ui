import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';

import { Sparkles } from 'lucide-react';
import BoardOfTrustee from '../../components/layouts/contacts/BoardOfTrustee';
import ContactForm from '../../components/layouts/contacts/ContactForm';
import ContactInfo from '../../components/layouts/contacts/ContactInfo';
import ContactMap from '../../components/layouts/contacts/ContactMap';

export default function ContactPage() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.contactPage || translations?.en?.contactPage;

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
                        {t.breadcrumbContact}
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

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <BoardOfTrustee t={t} />

                    <ContactForm t={t} />

                    <ContactInfo t={t} />

                    <ContactMap t={t} />

                </div>
            </main>
        </div>
    );
}