import { useState } from 'react';
import { Copy, Check, Building2, Smartphone } from 'lucide-react';

const accounts = [
    {
        id: 'bkash',
        type: 'mobile',
        provider: 'bKash (Merchant / Personal)',
        number: '01800-000000',
        note: 'Reference: Temple Seva'
    },
    {
        id: 'nagad',
        type: 'mobile',
        provider: 'Nagad (Personal)',
        number: '01700-000000',
        note: 'Send Money'
    },
    {
        id: 'bank',
        type: 'bank',
        provider: 'Dutch-Bangla Bank Ltd (DBBL)',
        number: '101.110.0000000',
        note: 'A/C Name: Golpahar Mohashoshan Kali Mandir'
    }
];

export default function PaymentAccountsCard({ t }) {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1.5">
                <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                    Official Channels
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                    {t.accountTitle}
                </h3>
                <p className="text-xs text-stone-600 dark:text-cream-200/75 leading-relaxed">
                    {t.accountSubtitle}
                </p>
            </div>

            <div className="space-y-3.5">
                {accounts.map((acc) => (
                    <div
                        key={acc.id}
                        className="p-4 rounded-2xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/20 flex items-center justify-between gap-3"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-600/15 text-amber-700 dark:text-amber-400 mt-0.5">
                                {acc.type === 'bank' ? <Building2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                            </div>
                            <div>
                                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block">
                                    {acc.provider}
                                </span>
                                <p className="text-sm sm:text-base font-mono font-bold text-stone-900 dark:text-cream-100 my-0.5">
                                    {acc.number}
                                </p>
                                <span className="text-[11px] text-stone-500 dark:text-cream-200/60">
                                    {acc.note}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleCopy(acc.id, acc.number)}
                            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-xs font-bold text-stone-700 dark:text-amber-300 hover:bg-amber-50 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                        >
                            {copiedId === acc.id ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-600">{t.copiedText}</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}