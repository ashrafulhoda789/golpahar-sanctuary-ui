import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm({ t }) {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white shadow-2xs">
                    Send Message
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                    {t.formTitle}
                </h3>
                <p className="text-xs text-stone-600 dark:text-cream-200/70">
                    {t.formSubtitle}
                </p>
            </div>

            {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-center space-y-2 my-auto">
                    <CheckCircle2 className="w-8 h-8 mx-auto" />
                    <p className="text-xs font-bold">{t.successMsg}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">{t.labelName}</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">{t.labelEmail}</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">{t.labelPhone}</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">{t.labelMessage}</label>
                        <textarea
                            rows={3}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        <Send className="w-3.5 h-3.5" /> {t.btnSubmit}
                    </button>
                </form>
            )}
        </div>
    );
}