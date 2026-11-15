import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';
import { Sparkles, Flame } from 'lucide-react';
import DeityCard from '../../components/layouts/deities/DeityCard';
import DeityDetailModal from '../../components/layouts/deities/DeityDetailModal';

const deitiesData = [
    {
        id: 'rashmoni',
        name_en: 'Lokamata Rani Rashmoni',
        name_bn: 'লোকমাতা রানী রাসমণি',
        birth_en: 'Born 28 Sept. 1793',
        birth_bn: 'জন্ম: ২৮ সেপ্টেম্বর ১৭৯৩',
        shortDesc_en: 'Born in Halisahar, married at eleven, pious zamindar and founder.',
        shortDesc_bn: 'হালিশাহরের কন্যা, অত্যন্ত পিয়াস ও দানশীল জমিদার নারী।',
        desc_en: 'Rashmoni was born in Kona Village of what is Halisahar in North 24 Parganas on 28th September 1793 (11th Ashwin, 1200 BS). She was married at the tender age of eleven to Babu Rajchandra Das, the Zamindar of Jan Bazar. Rajchandra died prematurely at 48, forcing the young widow to take on the reins of the zamindari while leading a deeply religious and austere life.',
        desc_bn: 'রানী রাসমণি ১৭৯৩ সালের ২৮ সেপ্টেম্বর উত্তর ২৪ পরগনার হালিশাহরে জন্মগ্রহণ করেন। মাত্র এগারো বছর বয়সে জানবাজারের জমিদার বাবু রাজচন্দ্র দাসের সাথে তাঁর বিবাহ হয়। রাজচন্দ্র দাসের অকাল মৃত্যুর পর তিনি অত্যন্ত সাহসিকতার সাথে জমিদারির দায়িত্বভার গ্রহণ করেন এবং আজীবন অত্যন্ত ধার্মিক ও পরোপকারী জীবনযাপন করেন।',
        image: 'https://i.ibb.co.com/Gv8njkz7/rani-rashmoti.webp'
    },
    {
        id: 'ramakrishna',
        name_en: 'Sri Ramakrishna Paramahansa',
        name_bn: 'শ্রীশ্রী রামকৃষ্ণ পরমহংস দেব',
        birth_en: 'Spiritual Master',
        birth_bn: 'আধ্যাত্মিক সাধক ও গুরু',
        shortDesc_en: 'All paths lead to the same goal. Appointed as dresser of Kali Mata.',
        shortDesc_bn: 'সকল পথ একই লক্ষ্যে পৌঁছায়। শ্রীশ্রী জগদীশ্বরী কালীমাতার পূজারী।',
        desc_en: 'Ramakrishna used to live in the Jhamapukur area in Central Calcutta, studying in the tol. Later, upon Ram Kumar’s request, he was appointed to the temple work as the dresser of Sri Sri Jagadiswari Kali Mata Thakurani, embodying supreme spiritual realization.',
        desc_bn: 'রামকৃষ্ণদেব সেসময়ে কলকাতার ঝামাপুকুরে বসবাস করতেন। পরবর্তীতে মায়ের ইচ্ছায় ও দাদামশাই রামকুমারের অনুরোধে তিনি দক্ষিণেশ্বর ও মন্দির কার্যক্রমে যুক্ত হন এবং শ্রীশ্রী জগদীশ্বরী কালীমাতা ঠাকুরাণীর পূজার দায়িত্ব গ্রহণ করেন।',
        image: 'https://i.ibb.co.com/VcC2f3Sn/Ramakrishna-Paramhansa.webp'
    },
    {
        id: 'sarada',
        name_en: 'Sri Sri Ma Sarada Devi',
        name_bn: 'শ্রীশ্রী মা সারদা দেবী',
        birth_en: 'Born 22 Dec. 1853',
        birth_bn: 'জন্ম: ২২ ডিসেম্বর ১৮৫৩',
        shortDesc_en: 'Holy Mother born in Jairambati, spiritual leader and guide.',
        shortDesc_bn: 'জয়রামবাটীর পবিত্র জননী, সংঘের আধ্যাত্মিক শক্তি ও পথপ্রদর্শক।',
        desc_en: 'Sarada Devi, lovingly revered as the Holy Mother, was born on 22nd December 1853 in Jairambati, Bankura. Married to Ramakrishna at six, she became a sacred and intellectual leader in her own right, serving disciples with quiet strength.',
        desc_bn: 'শ্রীশ্রী মা সারদা দেবী ১৮৫৩ সালের ২২ ডিসেম্বর বাঁকুড়ার জয়রামবাটীতে জন্মগ্রহণ করেন। মাত্র ছয় বছর বয়সে দক্ষিণেশ্বরের পূজারী শ্রী রামকৃষ্ণের সাথে তাঁর বিবাহ হয়। তিনি রামকৃষ্ণ সংঘের শক্তির উৎস ও পবিত্র মাতৃরূপের প্রতীক হিসেবে চিরস্মরণীয়।',
        image: 'https://i.ibb.co.com/GfHyRVBH/saradadevi.jpg'
    },
    {
        id: 'vivekananda',
        name_en: 'Swami Vivekananda',
        name_bn: 'স্বামী বিবেকানন্দ',
        birth_en: 'Born 12 Jan. 1863',
        birth_bn: 'জন্ম: ১২ জানুয়ারি ১৮৬৩',
        shortDesc_en: 'Narendranath Dutta, gifted philosopher, leader and guru disciple.',
        shortDesc_bn: 'নরেন্দ্রনাথ দত্ত, বহুমুখী প্রতিভাবান দার্শনিক ও বিশ্বজয়ী সন্ন্যাসী।',
        desc_en: 'Swami Vivekananda, born Narendranath Dutta, was gifted in music, sport, and rational thought. Haunted by the question of God, he found his guru in Sri Ramakrishna, and his meeting at Dakshineswar shaped his universal mission.',
        desc_bn: 'স্বামী বিবেকানন্দ (পূর্বাশ্রমের নাম নরেন্দ্রনাথ দত্ত) বিশ্বখ্যাত দার্শনিক ও সমাজ সংস্কারক। ঈশ্বরের সন্ধানে ব্যাকুল নরেন্দ্রনাথ দক্ষিণেশ্বরে শ্রী রামকৃষ্ণ পরমহংসদেবের সান্নিধ্য লাভ করেন এবং তাঁর শিষ্যত্ব গ্রহণ করে বিশ্বজুড়ে বেদান্ত প্রচার করেন।',
        image: 'https://i.ibb.co.com/6pbw8yt/swamivivek.jpg'
    }
];

export default function DeitiesPage() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.deitiesPage || translations?.en?.deitiesPage;

    const [selectedDeity, setSelectedDeity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (deity) => {
        setSelectedDeity(deity);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDeity(null);
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">

            <div className='bg-maroon-900'>
                <div className="px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4">
                    <nav className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                        <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
                            {t.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <span className="text-cream-200 font-semibold">
                            {t.breadcrumbDeities}
                        </span>
                    </nav>

                </div>

                <header className=" text-amber-100 py-10 px-4 sm:px-6 mt-6 shadow-md text-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sparkles className="w-3.5 h-3.5" /> {t.mainBadge}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-heading font-bold text-amber-500">
                        {t.mainTitle}
                    </h1>
                    <p className="text-xs sm:text-sm font-sans text-amber-200 max-w-2xl mx-auto leading-relaxed">
                        {t.mainSubtitle}
                    </p>
                </header>
            </div>

            <main className=" py-12 space-y-12">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl p-6 sm:p-10 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                                <div className="p-2.5 rounded-t-full border-2 border-amber-500/60 bg-amber-50/50 dark:bg-[#23060b] shadow-lg">
                                    <div className="overflow-hidden rounded-t-full aspect-[4/5] bg-amber-600/20">
                                        <img
                                            src="https://i.ibb.co.com/ZpDhhp2K/temple3.webp"
                                            alt="Shmashanakali Ma"
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-6">
                            <div>
                                <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white mb-2">
                                    {t.presidingBadge}
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                                    {t.presidingTitle}
                                </h2>
                                <p className="text-xs sm:text-sm text-stone-600 dark:text-cream-200/80 mt-2 leading-relaxed">
                                    {t.presidingDesc}
                                </p>
                            </div>

                            <div className="border border-stone-200 dark:border-amber-500/30 rounded-2xl overflow-hidden text-xs sm:text-sm">
                                <div className="bg-maroon-900 px-4 py-2 font-bold text-amber-300 border-b border-stone-200 dark:border-amber-500/30">
                                    {t.detailsTableTitle}
                                </div>
                                <div className="divide-y border-l-4 border-amber-700 divide-stone-200 dark:divide-amber-500/15">
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{t.tableDailyPuja}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{t.tableDailyPujaVal}</span>
                                    </div>
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{t.tableArati}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{t.tableAratiVal}</span>
                                    </div>
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{t.tableFestivals}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{t.tableFestivalsVal}</span>
                                    </div>
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{t.tableLocation}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{t.tableLocationVal}</span>
                                    </div>
                                    <div className="flex justify-between px-4 py-2.5">
                                        <span className="text-stone-500 dark:text-cream-200/60 font-medium">{t.tableShoe}</span>
                                        <span className="font-semibold text-stone-800 dark:text-cream-100">{t.tableShoeVal}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-1">
                                <Link
                                    to="/admin/puja-list"
                                    className="px-4 py-2 text-xs font-bold rounded-xl btn-primary shadow-md transition-all cursor-pointer"
                                >
                                    {t.btnBookPuja}
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className='py-10 bg-maroon-900'>
                    <div className="max-w-6xl mx-auto  bg-amber-600 text-stone-950 p-6 sm:p-8 rounded-3xl shadow-md text-center space-y-2">
                        <Flame className="w-8 h-8 mx-auto text-maroon-900" />
                        <h3 className="text-base sm:text-lg font-heading font-bold">
                            {t.quoteBanner}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                            {t.quoteAuthor}
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto  space-y-8">
                    <div className="text-center space-y-2">
                        <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                            {t.otherBadge}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                            {t.otherTitle}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deitiesData.map((deity) => (
                            <DeityCard
                                key={deity.id}
                                deity={deity}
                                onDetailsClick={handleOpenModal}
                                lang={lang}
                            />
                        ))}
                    </div>
                </div>

            </main>


            <DeityDetailModal
                deity={selectedDeity}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                lang={lang}
            />
        </div>
    );
}