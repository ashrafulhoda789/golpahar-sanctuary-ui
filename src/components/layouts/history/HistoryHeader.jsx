import { Link } from 'react-router';
import { Sparkles } from 'lucide-react';

export default function HistoryHeader({ t }) {
    return (
        <div className='bg-maroon-900'>
            <div className="px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4">
                <nav className="text-xs font-medium text-amber-500 flex items-center gap-1.5">
                    <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                        {t.breadcrumbHome}
                    </Link>
                    <span>/</span>
                    <span className="text-cream-200 font-semibold">
                        {t.breadcrumbHistory}
                    </span>
                </nav>

            </div>

            <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-600/15 text-amber-400  border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5" /> {t.badge}
                </span>
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-amber-500 leading-tight">
                    {t.title}
                </h1>
                <p className="text-sm sm:text-base text-cream-200 max-w-2xl mx-auto leading-relaxed">
                    {t.subtitle}
                </p>
            </header>
        </div>
    );
}