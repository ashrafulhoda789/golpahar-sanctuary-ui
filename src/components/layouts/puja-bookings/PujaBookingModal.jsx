import { useState } from "react";
import { X, Loader2, Sparkles } from "lucide-react";
import { createBooking } from "../../../lib/actions/bookings";

export default function PujaBookingModal({ isOpen, onClose, puja, lang, onSuccessBooking }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        gotra: "",
        preferredDate: puja?.date_en || "",
        note: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const isBn = lang === "bn";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await createBooking(formData);
            if (res.success) {
                onSuccessBooking(res.data); 
                onClose();
            } else {
                setError(res.message || "Failed to book puja.");
            }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-[#1a0408] border border-amber-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 bg-maroon-900 text-amber-100">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <h3 className="font-serif font-bold text-sm sm:text-base">
                            {isBn ? "পূজা বুকিং ফর্ম" : "Puja Booking Form"}
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                            {isBn ? "আপনার নাম *" : "Your Name *"}
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={isBn ? "পূর্ণ নাম লিখুন" : "Enter full name"}
                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                                {isBn ? "মোবাইল নম্বর *" : "Phone Number *"}
                            </label>
                            <input
                                type="text"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="01XXXXXXXXX"
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                                {isBn ? "ইমেইল (ঐচ্ছিক)" : "Email (Optional)"}
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                                {isBn ? "গোত্র *" : "Gotra *"}
                            </label>
                            <input
                                type="text"
                                name="gotra"
                                required
                                value={formData.gotra}
                                onChange={handleChange}
                                placeholder={isBn ? "যেমন: কাশ্যপ" : "e.g. Kashyap"}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                                {isBn ? "পূজার পছন্দসই তারিখ *" : "Preferred Puja Date *"}
                            </label>
                            <input
                                type="date"
                                name="preferredDate"
                                required
                                value={formData.preferredDate}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-700 dark:text-amber-200 mb-1">
                            {isBn ? "বিশেষ নোট (যদি থাকে)" : "Note (Optional)"}
                        </label>
                        <textarea
                            name="note"
                            rows={3}
                            value={formData.note}
                            onChange={handleChange}
                            placeholder={isBn ? "কোনো বিশেষ নিবেদন বা তথ্য..." : "Any special requests or details..."}
                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>{isBn ? "বুকিং নিশ্চিত করুন" : "Confirm Booking"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}