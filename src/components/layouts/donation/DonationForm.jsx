import { useState } from 'react';
import { HeartHandshake, CheckCircle2 } from 'lucide-react';
import { submitDonation } from '../../../lib/actions/donations';

const presetAmounts = [500, 1000, 2000, 5000];

export default function DonationForm({ t }) {
    const [amount, setAmount] = useState(1000);
    const [paymentMethod, setPaymentMethod] = useState('bKash');
    const [donorName, setDonorName] = useState('');
    const [phone, setPhone] = useState('');
    const [trxId, setTrxId] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) return;

        setLoading(true);
        setErrorMsg('');

        let formattedMethod = 'bkash';
        if (paymentMethod === 'Nagad') formattedMethod = 'nagad';
        if (paymentMethod.includes('Bank')) formattedMethod = 'bank_transfer';

        try {
            const res = await submitDonation({
                name: donorName.trim() || 'Anonymous',
                phone: phone.trim(),
                amount: Number(amount),
                paymentMethod: formattedMethod,
                transactionId: trxId.trim()
            });

            if (res && res.success) {
                setSubmitted(true);
                setDonorName('');
                setPhone('');
                setTrxId('');
                setTimeout(() => {
                    setSubmitted(false);
                }, 5000);
            } else {
                setErrorMsg(res.message || 'Failed to submit donation.');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Network error while submitting donation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
                <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white mb-2">
                    Seva Form
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                    {t.formTitle}
                </h3>
            </div>

            {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs text-center">
                    {errorMsg}
                </div>
            )}

            {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-center space-y-3 my-8">
                    <CheckCircle2 className="w-10 h-10 mx-auto" />
                    <p className="text-sm font-bold leading-relaxed">{t.successMsg}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-2">
                            {t.selectAmountLabel}
                        </label>
                        <div className="grid grid-cols-4 gap-2 mb-2.5">
                            {presetAmounts.map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    onClick={() => setAmount(preset)}
                                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${Number(amount) === preset
                                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                                        : 'bg-stone-50 dark:bg-[#23060b] text-stone-700 dark:text-cream-100 border-stone-200 dark:border-amber-500/30 hover:border-amber-500'
                                        }`}
                                >
                                    ৳{preset}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            min="10"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={t.customAmountPlaceholder}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-900 dark:text-cream-100 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                {t.donorNameLabel}
                            </label>
                            <input
                                type="text"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                placeholder={t.donorNamePlaceholder}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                {t.donorPhoneLabel}
                            </label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder={t.donorPhonePlaceholder}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                {t.paymentMethodLabel}
                            </label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            >
                                <option value="bKash">bKash</option>
                                <option value="Nagad">Nagad</option>
                                <option value="Bank Transfer">Bank Transfer (DBBL)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                {t.trxIdLabel}
                            </label>
                            <input
                                type="text"
                                required
                                value={trxId}
                                onChange={(e) => setTrxId(e.target.value)}
                                placeholder={t.trxIdPlaceholder}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 mt-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <HeartHandshake className="w-4 h-4" /> {loading ? 'Submitting...' : `${t.btnSubmit} (৳${amount || 0})`}
                    </button>
                </form>
            )}
        </div>
    );
}