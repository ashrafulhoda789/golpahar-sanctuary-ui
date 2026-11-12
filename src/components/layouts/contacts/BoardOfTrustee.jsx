import { ShieldCheck, User } from 'lucide-react';

export default function BoardOfTrustee({ t }) {
    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" /> Leadership
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                    {t.trusteeTitle}
                </h3>
                <p className="text-xs text-stone-600 dark:text-cream-200/70">
                    {t.trusteeSubtitle}
                </p>
            </div>

            <div className="space-y-3">
                {t.trusteesList.map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/15">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-cream-100">
                                    {member.name}
                                </h4>
                                <p className="text-[11px] font-medium text-amber-700 dark:text-amber-400">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}