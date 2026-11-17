/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { trackBookingByReference } from "../../lib/api/bookings";
import { submitBookingPayment } from "../../lib/actions/bookings";
import { useLanguage } from "../../context/LanguageContext";

export default function PujaTrackPage() {
    const { lang } = useLanguage();
    const [refCode, setRefCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState("");

    // Payment Form State
    const [paymentData, setPaymentData] = useState({
        paymentNumber: "",
        paymentMethod: "bKash",
        transactionId: ""
    });
    const [payLoading, setPayLoading] = useState(false);
    const [paySuccess, setPaySuccess] = useState("");

    const isBn = lang === "bn";

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!refCode.trim()) return;

        setLoading(true);
        setError("");
        setBooking(null);

        try {
            const res = await trackBookingByReference(refCode.trim());
            if (res.success) {
                setBooking(res.data);
            } else {
                setError(res.message || "Booking not found.");
            }
        } catch (err) {
            setError("Failed to fetch booking details.");
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setPayLoading(true);
        setPaySuccess("");

        try {
            const res = await submitBookingPayment(booking.id, paymentData);
            if (res.success) {
                setPaySuccess(isBn ? "পেমেন্ট তথ্য সফলভাবে জমা দেওয়া হয়েছে!" : "Payment information submitted successfully!");
  
                const updatedRes = await trackBookingByReference(refCode.trim());
                if (updatedRes.success) setBooking(updatedRes.data);
            } else {
                setError(res.message || "Failed to submit payment.");
            }
        } catch (err) {
            setError("Network error while submitting payment.");
        } finally {
            setPayLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 py-12 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400">
                        {isBn ? "পূজা বুকিং স্ট্যাটাস ট্র্যাক করুন" : "Track Your Puja Booking"}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70">
                        {isBn ? "আপনার রেফারেন্স কোড দিয়ে বর্তমান অবস্থা ও পেমেন্ট স্ট্যাটাস জানুন।" : "Enter your reference code to check current status and payment options."}
                    </p>
                </div>

                {/* Search Box */}
                <form onSubmit={handleSearch} className="flex gap-2 bg-white dark:bg-[#1a0408] p-2 rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-md">
                    <input
                        type="text"
                        value={refCode}
                        onChange={(e) => setRefCode(e.target.value)}
                        placeholder={isBn ? "যেমন: GMS-84920" : "e.g. GMS-84920"}
                        className="w-full px-4 py-2.5 text-xs rounded-xl bg-transparent focus:outline-none text-stone-800 dark:text-cream-100 uppercase"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        <span>{isBn ? "খুঁজুন" : "Track"}</span>
                    </button>
                </form>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-2xl text-center">
                        {error}
                    </div>
                )}

                {/* Booking Details Card */}
                {booking && (
                    <div className="bg-white dark:bg-[#1a0408] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-amber-500/15">
                            <div>
                                <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                                    {isBn ? "রেফারেন্স কোড" : "Reference Code"}
                                </span>
                                <h3 className="text-lg font-mono font-bold text-amber-600 dark:text-amber-400">
                                    {booking.referenceCode}
                                </h3>
                            </div>
                            <div>
                                <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold block text-right">
                                    {isBn ? "স্ট্যাটাস" : "Status"}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                                    booking.status === 'confirmed' ? 'bg-green-500/10 text-green-600 border border-green-500/20' :
                                    booking.status === 'rejected' ? 'bg-red-500/10 text-red-600 border border-red-500/20' :
                                    'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                                }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-stone-400 block">{isBn ? "নাম" : "Name"}</span>
                                <span className="font-bold text-stone-800 dark:text-cream-100">{booking.name}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block">{isBn ? "মোবাইল" : "Phone"}</span>
                                <span className="font-bold text-stone-800 dark:text-cream-100">{booking.phone}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block">{isBn ? "গোত্র" : "Gotra"}</span>
                                <span className="font-bold text-stone-800 dark:text-cream-100">{booking.gotra}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block">{isBn ? "পছন্দসই তারিখ" : "Preferred Date"}</span>
                                <span className="font-bold text-stone-800 dark:text-cream-100">{booking.preferredDate}</span>
                            </div>
                        </div>

                        {booking.adminNote && (
                            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 rounded-xl text-xs">
                                <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">
                                    {isBn ? "এডমিন নোট:" : "Admin Note:"}
                                </span>
                                <p className="text-stone-600 dark:text-cream-200">{booking.adminNote}</p>
                            </div>
                        )}

                        {booking.status === 'confirmed' && booking.paymentStatus === 'unpaid' && (
                            <div className="pt-4 border-t border-stone-100 dark:border-amber-500/15 space-y-4">
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl space-y-1">
                                    <h4 className="text-xs font-bold text-green-700 dark:text-green-400">
                                        {isBn ? "আপনার বুকিংটি অনুমোদিত হয়েছে! অনুগ্রহ করে পেমেন্ট করুন।" : "Your booking is confirmed! Please complete your payment."}
                                    </h4>
                                    <p className="text-[11px] text-stone-600 dark:text-cream-200/70">
                                        {isBn ? "বিকাশ/নগদ পার্সোনাল নম্বরে (01XXXXXXXXX) ফি পাঠিয়ে নিচের ফর্মটি পূরণ করুন।" : "Send fee to our bKash/Nagad merchant/personal number and submit transaction details below."}
                                    </p>
                                </div>

                                {paySuccess && (
                                    <div className="p-3 bg-green-500/10 text-green-600 text-xs rounded-xl border border-green-500/20">
                                        {paySuccess}
                                    </div>
                                )}

                                <form onSubmit={handlePaymentSubmit} className="space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                                {isBn ? "পেমেন্ট মাধ্যম" : "Payment Method"}
                                            </label>
                                            <select
                                                value={paymentData.paymentMethod}
                                                onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none"
                                            >
                                                <option value="bKash">bKash</option>
                                                <option value="Nagad">Nagad</option>
                                                <option value="Rocket">Rocket</option>
                                                <option value="Bank">Bank Transfer</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                                {isBn ? "যে নম্বর থেকে পাঠিয়েছেন" : "Sender Mobile Number"}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={paymentData.paymentNumber}
                                                onChange={(e) => setPaymentData({ ...paymentData, paymentNumber: e.target.value })}
                                                placeholder="01XXXXXXXXX"
                                                className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                            {isBn ? "ট্রানজেকশন আইডি (TrxID)" : "Transaction ID (TrxID)"}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={paymentData.transactionId}
                                            onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                                            placeholder="9N78X..."
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none uppercase"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={payLoading}
                                        className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                                    >
                                        {payLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                        <span>{isBn ? "পেমেন্ট তথ্য জমা দিন" : "Submit Payment Info"}</span>
                                    </button>
                                </form>
                            </div>
                        )}

                        {booking.paymentStatus === 'submitted' && (
                            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs rounded-xl text-center font-medium">
                                {isBn ? "আপনার পেমেন্ট তথ্য জমা দেওয়া হয়েছে। এডমিন যাচাই করে শীঘ্রই পূজা শিডিউল করবেন।" : "Payment info submitted. Admin will verify and schedule your puja soon."}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}