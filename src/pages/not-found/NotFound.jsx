import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';
import { Flame, Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.notFoundPage || translations?.en?.notFoundPage;

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300 flex flex-col justify-between">

            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4">
                <nav className="text-xs font-medium text-stone-500 dark:text-amber-200/70 flex items-center gap-1.5">
                    <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                        {t.breadcrumbHome}
                    </Link>
                    <span>/</span>
                    <span className="text-stone-800 dark:text-amber-100 font-semibold">
                        {t.breadcrumbNotFound}
                    </span>
                </nav>

            </div>

            <main className="max-w-md mx-auto px-4 py-16 text-center space-y-6 my-auto">
                <div className="relative w-24 h-24 mx-auto rounded-3xl bg-amber-600/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-lg">
                    <Flame className="w-12 h-12 animate-pulse" />
                    <span className="absolute -top-2 -right-2 p-1.5 rounded-full bg-[#7c1d1d] text-white shadow-md">
                        <AlertCircle className="w-4 h-4" />
                    </span>
                </div>

                <div className="space-y-2">
                    <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                        {t.badge}
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                        {t.title}
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600 dark:text-cream-200/80 leading-relaxed pt-2">
                        {t.subtitle}
                    </p>
                </div>

                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all cursor-pointer"
                    >
                        <Home className="w-4 h-4" /> {t.btnHome}
                    </Link>
                </div>
            </main>

            <div className="py-6 text-center text-xs text-stone-400 dark:text-amber-200/40">
                Golpahar Mohashoshan Kali Mandir © {new Date().getFullYear()}
            </div>

        </div>
    );
}