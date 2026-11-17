import { useLocation, Link } from "react-router";
import { CheckCircle2, Copy, ArrowLeft, Search, Sparkles, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function PujaSuccessPage() {
    const { lang } = useLanguage();
    const location = useLocation();
    const bookingData = location.state?.bookingData; 
    const [copied, setCopied] = useState(false);

    const isBn = lang === "bn";

    useEffect(() => {
        if (bookingData?.whatsappUrl) {
            
            const timer = setTimeout(() => {
                window.open(bookingData.whatsappUrl, "_blank");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [bookingData]);

    const handleCopy = () => {
        if (bookingData?.referenceCode) {
            navigator.clipboard.writeText(bookingData.referenceCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 py-16 px-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-white dark:bg-[#1a0408] border border-amber-500/30 rounded-3xl p-8 shadow-xl text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Sparkles className="w-3 h-3" /> {isBn ? "বুকিং সফল হয়েছে" : "Booking Successful"}
                    </span>
                    <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
                        {isBn ? "ধন্যবাদ, আপনার পূজা বুকিং সম্পন্ন হয়েছে!" : "Thank You, Puja Booked Successfully!"}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70">
                        {isBn 
                            ? "আপনার পূজাটি সফলভাবে তালিকাভুক্ত করা হয়েছে। আপনার হোয়াটসঅ্যাপে স্বয়ংক্রিয়ভাবে স্ট্যাটাস পাঠানো হচ্ছে..." 
                            : "Your puja has been successfully registered. Status is being automatically sent to your WhatsApp..."}
                    </p>
                </div>

                {bookingData?.referenceCode && (
                    <div className="p-4 bg-stone-50 dark:bg-[#23060b] border border-amber-500/20 rounded-2xl space-y-2">
                        <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                            {isBn ? "বুকিং রেফারেন্স কোড" : "Booking Reference Code"}
                        </span>
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-xl font-mono font-bold text-amber-700 dark:text-amber-400">
                                {bookingData.referenceCode}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 transition cursor-pointer"
                                title="Copy Code"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        {copied && (
                            <span className="block text-[10px] text-green-600 font-medium">
                                {isBn ? "কোডটি কপি করা হয়েছে!" : "Code copied to clipboard!"}
                            </span>
                        )}
                    </div>
                )}

                <div className="pt-4 flex flex-col gap-3">
                    
                    {bookingData?.whatsappUrl && (
                        <a
                            href={bookingData.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                        >
                            <MessageCircle className="w-4 h-4 fill-current" />
                            <span>{isBn ? "হোয়াটসঅ্যাপে পুনরায় স্ট্যাটাস পাঠান" : "Resend Status on WhatsApp"}</span>
                        </a>
                    )}

                    <Link
                        to="/pujas/track"
                        className="py-3 px-4 rounded-xl bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
                    >
                        <Search className="w-4 h-4" />
                        <span>{isBn ? "বুকিং স্ট্যাটাস চেক করুন" : "Track Puja Status"}</span>
                    </Link>

                    <Link
                        to="/pujas"
                        className="py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-cream-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{isBn ? "অন্যান্য পূজাসমূহ দেখুন" : "Back to Pujas List"}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}