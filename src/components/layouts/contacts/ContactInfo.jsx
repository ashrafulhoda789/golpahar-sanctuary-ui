import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactInfo({ t }) {
    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                    Information
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                    {t.infoTitle}
                </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="font-bold text-stone-900 dark:text-amber-200 block mb-0.5">{t.addressLabel}</span>
                        <p className="text-stone-600 dark:text-cream-200/75 leading-relaxed">{t.addressVal}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-600 dark:text-amber-400 shrink-0">
                        <Phone className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="font-bold text-stone-900 dark:text-amber-200 block mb-0.5">{t.phoneLabel}</span>
                        <p className="text-stone-600 dark:text-cream-200/75">{t.phoneVal}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-600 dark:text-amber-400 shrink-0">
                        <Mail className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="font-bold text-stone-900 dark:text-amber-200 block mb-0.5">{t.emailLabel}</span>
                        <p className="text-stone-600 dark:text-cream-200/75">{t.emailVal}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-amber-600/10 text-amber-600 dark:text-amber-400 shrink-0">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="font-bold text-stone-900 dark:text-amber-200 block mb-0.5">{t.hoursLabel}</span>
                        <p className="text-stone-600 dark:text-cream-200/75">{t.hoursVal}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}