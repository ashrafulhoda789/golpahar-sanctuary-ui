/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Flame, Loader2 } from 'lucide-react';
import DeityCard from '../../components/layouts/deities/DeityCard';
import DeityDetailModal from '../../components/layouts/deities/DeityDetailModal';
import { fetchSiteSettings } from '../../lib/api/contents';

export default function DeitiesPage() {
    const { lang } = useLanguage();
    const isBn = lang === 'bn';

    const [loading, setLoading] = useState(true);
    const [deitiesData, setDeitiesData] = useState(null);

    const [selectedDeity, setSelectedDeity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadDeitiesContent();
    }, []);

    const loadDeitiesContent = async () => {
        try {
            setLoading(true);
            const data = await fetchSiteSettings();
            if (data && data.deities) {
                setDeitiesData(data.deities);
            }
        } catch (err) {
            console.error("Failed to load deities content:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (deity) => {
        setSelectedDeity(deity);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDeity(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
        );
    }

    // ব্যাকএন্ড থেকে ডেটা না আসলে ডিফল্ট ফলব্যাক
    const pageTitle = isBn ? (deitiesData?.pageTitle_bn || "মন্দিরের দেবতা ও পূজনীয় সাধকগণ") : (deitiesData?.pageTitle_en || "TEMPLE DEITIES & REVERED SAGES");
    const pageDesc = isBn ? (deitiesData?.description_bn || "মা মহাশ্মশানকালী এবং মন্দির প্রাঙ্গণের সাথে যুক্ত দিব্য সত্ত্বাদের পরিচিতি।") : (deitiesData?.description_en || "Introduction to Goddess Shmashanakali and the divine personalities associated with the temple premises.");
    
    const presiding = deitiesData?.presidingDeity || {};
    const items = deitiesData?.items || [];

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">

            <div className='bg-maroon-900'>
                <div className="px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4">
                    <nav className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                        <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                            {isBn ? "হোম" : "Home"}
                        </Link>
                        <span>/</span>
                        <span className="text-cream-200 font-semibold">
                            {isBn ? "দেবতা ও সাধকগণ" : "Deities"}
                        </span>
                    </nav>
                </div>

                <header className="text-amber-100 py-10 px-4 sm:px-6 mt-6 shadow-md text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="w-3.5 h-3.5" /> {isBn ? "পবিত্র অভয়ারণ্য" : "DIVINE SANCTUARY"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-heading font-bold text-amber-500">
                        {pageTitle}
                    </h1>
                    <p className="text-xs sm:text-sm font-sans text-amber-200 max-w-2xl mx-auto leading-relaxed">
                        {pageDesc}
                    </p>
                </header>
            </div>

            <main className="py-12 space-y-12">

                {/* Presiding Deity Section */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 sm:p-10 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                                <div className="p-2.5 rounded-t-full border-2 border-amber-500/60 bg-amber-50/50 dark:bg-[#23060b] shadow-lg">
                                    <div className="overflow-hidden rounded-t-full aspect-[4/5] bg-amber-600/20">
                                        <img
                                            src={presiding.imageUrl || "https://i.ibb.co.com/ZpDhhp2K/temple3.webp"}
                                            alt={presiding.name_en || "Presiding Deity"}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white mb-2">
                                    {isBn ? (presiding.badge_bn || "পবিত্র অভয়ারণ্য") : (presiding.badge_en || "DIVINE SANCTUARY")}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                                    {isBn ? presiding.name_bn : presiding.name_en}
                                </h2>
                                <p className="text-xs sm:text-sm text-stone-600 dark:text-cream-200/80 mt-2 leading-relaxed">
                                    {isBn ? presiding.description_bn : presiding.description_en}
                                </p>
                            </div>

                            <div className="border border-stone-200 dark:border-amber-500/30 rounded-2xl overflow-hidden text-xs sm:text-sm">
                                <div className="bg-maroon-900 px-4 py-2 font-bold text-amber-300 border-b border-stone-200 dark:border-amber-500/30">
                                    {isBn ? "সংক্ষিপ্ত বিবরণী (Quick Overview)" : "Quick Overview"}
                                </div>
                                <div className="divide-y border-l-4 border-amber-700 divide-stone-200 dark:divide-amber-500/15">
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{isBn ? "দৈনিক পূজা" : "Daily Puja"}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{isBn ? presiding.dailyPuja_bn : presiding.dailyPuja_en}</span>
                                    </div>
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{isBn ? "সন্ধ্যা আরতি" : "Evening Arati"}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{isBn ? presiding.eveningArati_bn : presiding.eveningArati_en}</span>
                                    </div>
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{isBn ? "প্রধান উৎসব" : "Major Festivals"}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{isBn ? presiding.majorFestivals_bn : presiding.majorFestivals_en}</span>
                                    </div>
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{isBn ? "অবস্থান" : "Location"}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{isBn ? presiding.location_bn : presiding.location_en}</span>
                                    </div>
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{isBn ? "জুতো রাখার স্থান" : "Shoe Keeping"}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{isBn ? presiding.shoeKeeping_bn : presiding.shoeKeeping_en}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-1">
                                <Link
                                    to="/admin/puja-list"
                                    className="px-4 py-2 text-xs font-bold rounded-xl btn-primary shadow-md transition-all cursor-pointer"
                                >
                                    {isBn ? "পূজা বুকিং করুন" : "Book Puja"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='py-10 bg-maroon-900'>
                    <div className="max-w-200 mx-auto bg-[#F8D287] text-stone-950 p-4 sm:p-6 rounded-3xl shadow-md text-center space-y-2">
                        <Flame className="w-8 h-8 mx-auto text-maroon-900" />
                        <h3 className="text-base sm:text-lg font-heading font-bold">
                            {isBn ? "ভক্তি ও বিশ্বাসের সাথে নিবেদিত পবিত্র প্রাঙ্গণ" : "A Sacred Sanctuary Dedicated with Devotion and Faith"}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                            {isBn ? "গোলপাহাড় মহাশ্মশান কালী মন্দির" : "Golpahar Mohashoshan Kali Mandir"}
                        </p>
                    </div>
                </div>

                {/* Additional Deities & Sages Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
                    <div className="text-center space-y-2">
                        <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                            {isBn ? "পূজনীয় ব্যক্তিত্ব" : "REVERED SAGES & FIGURES"}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                            {isBn ? "অন্যান্য দেবতা ও সাধকগণ" : "Other Deities & Revered Sages"}
                        </h3>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-12 text-xs text-stone-400">
                            {isBn ? "কোনো অতিরিক্ত দেবতা বা সাধকের তথ্য পাওয়া যায়নি।" : "No additional deities or sages found."}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {items.map((deity, index) => {
                                // DeityCard কম্পোনেন্ট যে প্রপসগুলো আশা করে সে অনুযায়ী ডাটা ফরম্যাট করা হলো
                                const formattedDeity = {
                                    id: index,
                                    name_en: deity.name_en,
                                    name_bn: deity.name_bn,
                                    birth_en: deity.birthDeath_en,
                                    birth_bn: deity.birthDeath_bn,
                                    shortDesc_en: deity.description_en ? deity.description_en.substring(0, 80) + '...' : '',
                                    shortDesc_bn: deity.description_bn ? deity.description_bn.substring(0, 80) + '...' : '',
                                    desc_en: deity.description_en,
                                    desc_bn: deity.description_bn,
                                    image: deity.imageUrl
                                };

                                return (
                                    <DeityCard
                                        key={index}
                                        deity={formattedDeity}
                                        onDetailsClick={handleOpenModal}
                                        lang={lang}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>

            </main>

            <DeityDetailModal
                deity={selectedDeity ? {
                    ...selectedDeity,
                    
                    shortDesc_en: selectedDeity.desc_en,
                    shortDesc_bn: selectedDeity.desc_bn
                } : null}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                lang={lang}
            />
        </div>
    );
}