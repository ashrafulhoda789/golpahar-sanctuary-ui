import { Quote, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FooterTopbar = () => {
    const { t } = useLanguage();

    return (
        <section className="relative bg-maroon-800 py-12 px-4 sm:px-6 lg:px-8 border-t-2 border-amber-500/30 border-b border-b-maroon-900 text-amber-100 overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 pointer-events-none" />

            <div className="max-w-350 mx-auto w-full relative z-10 flex flex-col items-center text-center space-y-4">

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-maroon-900 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t?.footerTopbar?.tag || 'Eternal Wisdom'}</span>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    <Quote className="w-8 h-8 text-amber-400/60 mx-auto rotate-180" />
                    <blockquote className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium text-amber-200 leading-relaxed italic">
                        {t?.footerTopbar?.quote || '"In the lap of the Divine Mother, every soul finds refuge, every darkness finds light, and every heart finds peace."'}
                    </blockquote>
                    <p className="text-xs sm:text-sm font-semibold text-amber-400/90 tracking-wider uppercase">
                        {t?.footerTopbar?.tradition || '— Sacred Tradition of Golpahar Kali Mandir'}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default FooterTopbar;