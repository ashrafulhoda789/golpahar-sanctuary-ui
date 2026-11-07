import { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle, AlertTriangle, X } from 'lucide-react';

const Donation = () => {
    const [amount, setAmount] = useState('1000');
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', agree: false });
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const predefinedAmounts = ['500', '1000', '5000', '10000'];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const triggerToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 9000);
    };

    const handleDonate = (e) => {
        e.preventDefault();

        if (!amount || Number(amount) <= 0) {
            triggerToast('Please enter a valid donation amount.', 'warning');
            return;
        }

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
            triggerToast('Please fill in all personal info fields (Name & Email).', 'warning');
            return;
        }

        if (!formData.agree) {
            triggerToast('You must agree to the data collection terms to proceed.', 'warning');
            return;
        }

        triggerToast(`Thank you, ${formData.firstName}! Your donation of ৳${amount} was successful.`, 'success');
        setFormData({ firstName: '', lastName: '', email: '', agree: false });
    };

    return (
        <section className="relative bg-cream-200 py-14 px-4 sm:px-6 lg:px-8">

            {toast.show && (
                <div
                    className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all animate-bounce ${toast.type === 'success'
                            ? 'bg-emerald-900 border-emerald-500 text-emerald-100'
                            : 'bg-amber-900 border-amber-500 text-amber-100'
                        }`}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{toast.message}</span>
                    <button
                        onClick={() => setToast({ show: false, message: '', type: '' })}
                        className="ml-2 p-1 rounded-full hover:bg-black/20 text-cream-100"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="max-w-350 mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-block px-3.5 py-1 rounded-full bg-cream-200 border border-cream-300">
                            <span className="text-xs font-semibold tracking-widest text-maroon-900 uppercase">
                                DONATIONS
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-maroon-900 leading-tight">
                            Dakshina: Temple's Practice of "Giving Back"
                        </h2>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            Dakshina is an ancient tradition of contributing to the financial support of sacred spaces and community service. Your generous contribution helps maintain the temple premises, daily aarti, and charitable activities.
                        </p>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            When we experience a pure inner impulse to help others and express our gratitude, it is called true service. Every contribution, big or small, supports our spiritual and social mission in Chittagong.
                        </p>

                        <div className="pt-2 flex items-center gap-3 text-maroon-900 font-semibold text-sm">
                            <ShieldCheck className="w-5 h-5 text-amber-600" />
                            <span>Secure & Transparent Transaction Process</span>
                        </div>
                    </div>

                    <form onSubmit={handleDonate} className="lg:col-span-6 bg-[#f3deb1] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-2xl sm:text-3xl font-heading font-bold text-maroon-900">
                                    45,000TK <span className="text-sm font-normal text-gray-600">of 1,60,000TK raised</span>
                                </span>
                                <span className="text-xs font-semibold text-amber-800 bg-cream-300 px-2.5 py-1 rounded-full">
                                    28% Funded
                                </span>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full bg-cream-300 h-3 rounded-full overflow-hidden">
                                <div className="bg-maroon-900 h-full rounded-full w-[28%]"></div>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-300/60 rounded-xl p-3.5 flex items-start gap-3">
                            <span className="text-amber-600 font-bold text-base">⚠️</span>
                            <p className="text-xs text-amber-900 leading-relaxed">
                                <strong className="font-semibold">Notice:</strong> Test mode is enabled. While in test mode no live financial deductions are processed.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-900">
                                Enter or Select Amount (BDT)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon-900 font-bold">৳</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-9 pr-4 py-3 bg-cream-100 border border-cream-300 rounded-xl font-heading font-bold text-maroon-900 focus:outline-none focus:ring-2 focus:ring-maroon-800"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2.5">
                            {predefinedAmounts.map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAmount(val)}
                                    className={`py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all border ${amount === val
                                            ? 'bg-maroon-900 text-amber-200 border-maroon-900 shadow-md'
                                            : 'bg-cream-100 text-maroon-900 border-cream-300 hover:bg-cream-200'
                                        }`}
                                >
                                    {val}TK
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4 pt-2">
                            <h3 className="font-heading font-bold text-maroon-900 text-base border-b border-cream-300 pb-2">
                                Personal Info
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-cream-100 border border-cream-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-maroon-800"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-cream-100 border border-cream-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-maroon-800"
                                    />
                                </div>
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-cream-100 border border-cream-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-maroon-800"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs text-maroon-800 hover:underline font-medium">
                                Show Terms
                            </button>
                        </div>

                        <div className="flex items-start gap-2.5">
                            <input
                                type="checkbox"
                                name="agree"
                                id="agree"
                                checked={formData.agree}
                                onChange={handleInputChange}
                                className="mt-1 rounded border-cream-300 text-maroon-900 focus:ring-maroon-800"
                            />
                            <label htmlFor="agree" className="text-xs text-gray-700 leading-relaxed cursor-pointer">
                                I agree that my submitted data is being collected and stored for donation record purposes.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 px-6 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-amber-200 font-heading font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Heart className="w-5 h-5 text-amber-400 fill-amber-400" />
                            <span>Donate Now</span>
                        </button>

                    </form>

                </div>
            </div>
        </section>
    );
};

export default Donation;