import { Link } from 'react-router';
import { Flame } from 'lucide-react';

export default function HistoryFooterCta({ t }) {
    return (
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#7c1d1d] to-[#450a0a] text-amber-100 p-8 sm:p-10 rounded-3xl shadow-xl text-center space-y-4 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <Flame className="w-64 h-64 text-amber-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Committee Leadership
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                {t.committeeTitle}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto leading-relaxed">
                {t.ctaDesc}
            </p>
            <div className="pt-2">
                <Link
                    to="/"
                    className="inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md transition-all cursor-pointer"
                >
                    {t.breadcrumbHome}
                </Link>
            </div>
        </div>
    );
}