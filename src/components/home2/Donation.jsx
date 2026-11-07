import { useState } from 'react';
import { Heart, ShieldCheck, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const presetAmounts = [500, 1000, 5000, 10000];

const Donation = () => {
    const [amount, setAmount] = useState(1000);
    const [customAmount, setCustomAmount] = useState('1000');
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', agree: false });
    const [toast, setToast] = useState(null);

    const handlePresetClick = (val) => {
        setAmount(val);
        setCustomAmount(val.toString());
    };

    const handleCustomChange = (e) => {
        const val = e.target.value;
        setCustomAmount(val);
        const parsed = Number(val);
        if (!isNaN(parsed)) setAmount(parsed);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email) {
            setToast({ type: 'error', message: 'Please fill in your name and email address.' });
            setTimeout(() => setToast(null), 4000);
            return;
        }
        if (!formData.agree) {
            setToast({ type: 'error', message: 'Please agree to the terms and data collection policy.' });
            setTimeout(() => setToast(null), 4000);
            return;
        }

        setToast({ type: 'success', message: `Thank you, ${formData.firstName}! Redirecting to secure gateway for ৳${amount} BDT...` });
        setTimeout(() => setToast(null), 5000);
    };

    return (
        <section className="relative bg-cream-200 py-20 px-4 sm:px-6 lg:px-8 border-b border-cream-300">
            <div className="max-w-350 mx-auto w-full">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-5 space-y-6">
                        
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200 border border-amber-500/40">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-semibold text-maroon-900 uppercase tracking-widest">
                                Dakshina & Seva
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-heading font-bold text-maroon-900 leading-tight">
                            Temple's Practice of <span className="text-amber-700">"Giving Back"</span>
                        </h2>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            Dakshina is an ancient sacred tradition of contributing to the maintenance of holy spaces and community welfare. Your generous contribution directly supports daily aartis, temple upkeep, and charitable social initiatives in Chittagong.
                        </p>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-start gap-3">
                                <span className="p-2 rounded-xl bg-maroon-900 text-amber-200 mt-0.5 shadow-sm">
                                    <ShieldCheck className="w-5 h-5" />
                                </span>
                                <div>
                                    <h4 className="font-heading font-bold text-maroon-900 text-sm">Secure Multi-Currency Support</h4>
                                    <p className="text-xs text-gray-600">Transactions are encrypted and safely processed via authorized gateways.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="p-2 rounded-xl bg-maroon-900 text-amber-200 mt-0.5 shadow-sm">
                                    <Heart className="w-5 h-5" />
                                </span>
                                <div>
                                    <h4 className="font-heading font-bold text-maroon-900 text-sm">Direct Community Impact</h4>
                                    <p className="text-xs text-gray-600">Every rupee goes straight towards spiritual services and welfare.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="lg:col-span-7 bg-maroon-900 text-amber-100 p-6 sm:p-10 shadow-2xl border-2 border-amber-500/40 relative">

                        {toast && (
                            <div className={`mb-6 p-4  border flex items-center gap-3 text-xs sm:text-sm font-medium ${
                                toast.type === 'success' 
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200' 
                                    : 'bg-rose-950 border-rose-500 text-rose-200'
                            }`}>
                                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                                <span>{toast.message}</span>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-maroon-800">
                            <div>
                                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">Current Fundraiser</span>
                                <h3 className="text-2xl font-heading font-bold text-amber-200">
                                    ৳45,000 <span className="text-sm font-normal text-gray-300">raised of ৳1,60,000 goal</span>
                                </h3>
                            </div>
                            <div className="bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 w-fit">
                                <span className="text-xs font-bold text-amber-300">28% Funded</span>
                            </div>
                        </div>

                        <div className="w-full bg-maroon-950 h-2.5 overflow-hidden mb-8">
                            <div className="bg-amber-500 h-full  transition-all duration-1000" style={{ width: '28%' }} />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-amber-200 mb-2">
                                    Select or Enter Amount (BDT)
                                </label>
                                <div className="relative mb-3">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-heading font-bold text-amber-300">৳</span>
                                    <input
                                        type="text"
                                        value={customAmount}
                                        onChange={handleCustomChange}
                                        className="w-full bg-maroon-950 border border-amber-500/30  py-3 pl-9 pr-4 font-heading font-bold text-amber-200 focus:outline-none focus:border-amber-500 transition-colors"
                                        placeholder="Enter amount"
                                    />
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {presetAmounts.map((val) => (
                                        <button
                                            type="button"
                                            key={val}
                                            onClick={() => handlePresetClick(val)}
                                            className={`py-2.5 font-heading font-bold text-xs sm:text-sm transition-all ${
                                                amount === val
                                                    ? 'bg-amber-500 text-maroon-950 shadow-md scale-105'
                                                    : 'bg-maroon-950 border border-amber-500/30 hover:bg-maroon-800 text-amber-200'
                                            }`}
                                        >
                                            ৳{val.toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-200 block">
                                    Personal Information
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="bg-maroon-950 border border-amber-500/30 px-4 py-3 text-xs sm:text-sm text-amber-100 placeholder-gray-400 focus:outline-none focus:border-amber-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="bg-maroon-950 border border-amber-500/30  px-4 py-3 text-xs sm:text-sm text-amber-100 placeholder-gray-400 focus:outline-none focus:border-amber-500"
                                    />
                                </div>

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-maroon-950 border border-amber-500/30 px-4 py-3 text-xs sm:text-sm text-amber-100 placeholder-gray-400 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="flex items-start gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="terms2"
                                    checked={formData.agree}
                                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                                    className="mt-1 rounded border-amber-500/40 text-amber-500 focus:ring-amber-500 bg-maroon-950"
                                />
                                <label htmlFor="terms2" className="text-[11px] text-gray-300 leading-relaxed cursor-pointer">
                                    I agree that my submitted data is being collected and stored for donation record and tax receipt purposes.
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-amber-500 text-maroon-950 font-heading font-bold text-sm sm:text-base hover:bg-amber-400 transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <Heart className="w-5 h-5 text-maroon-950 group-hover:scale-125 transition-transform" />
                                <span>Proceed Securely to Donate ৳{amount.toLocaleString()}</span>
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Donation;