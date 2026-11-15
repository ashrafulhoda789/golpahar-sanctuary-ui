import  { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';
import { getAllNotices } from '../../lib/api/notices';
import { Sparkles, Bell, Calendar, Download, Pin } from 'lucide-react';

export default function NoticesPage() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.noticesPage || translations?.en?.noticesPage;

    const [apiNotices, setApiNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await getAllNotices();
                if (response && (response.success || Array.isArray(response.data || response))) {
                    
                    const dataList = response.data || response;
                    setApiNotices(Array.isArray(dataList) ? dataList : [dataList]);
                }
            } catch (error) {
                console.error("Failed to load backend notices:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const staticNotices = [
        {
            id: 'static-1',
            title_en: 'General Meeting Regarding Winter Festival Arrangements',
            title_bn: 'শীতকালীন উৎসব আয়োজন সম্পর্কিত সাধারণ সভা',
            category_en: 'Meeting',
            category_bn: 'সভা',
            description_en: 'All committee members and active volunteers are requested to attend the general meeting this Sunday at the temple office.',
            description_bn: 'আগামী রবিবার মন্দির কার্যালয়ে সকল কার্যনির্বাহী সদস্য ও স্বেচ্ছাসেবকদের উপস্থিত থাকার জন্য বিশেষভাবে অনুরোধ করা হচ্ছে।',
            publish_date: '2026-11-10',
            expiry_date: '2026-11-20',
            is_pinned: 0,
            attachment_url: ''
        },
        {
            id: 'static-2',
            title_en: 'Annadan & Mahaprasad Distribution Schedule Update',
            title_bn: 'মহাপ্রসাদ বিতরণ ও অন্নদান সময়সূচি আপডেট',
            category_en: 'Announcements',
            category_bn: 'ঘোষণা',
            description_en: 'Please note the revised timings for daily Mahaprasad distribution during the upcoming holy occasions.',
            description_bn: 'আসন্ন পবিত্র দিনগুলোতে প্রতিদিনের মহাপ্রসাদ বিতরণের পরিবর্তিত সময়সূচি নিচে প্রদান করা হলো।',
            publish_date: '2026-11-05',
            expiry_date: '2026-11-30',
            is_pinned: 0,
            attachment_url: '#'
        },
        {
            id: 'static-3',
            title_en: 'Temple Cleaning and Maintenance Notice',
            titlebn: 'মন্দির প্রাঙ্গণ পরিষ্কার-পরিচ্ছন্নতা ও রক্ষণাবেক্ষণ নোটিশ',
            title_bn: 'মন্দির প্রাঙ্গণ পরিষ্কার-পরিচ্ছন্নতা ও রক্ষণাবেক্ষণ নোটিশ',
            category_en: 'General',
            category_bn: 'সাধারণ',
            description_en: 'The inner sanctum will remain closed for deep cleaning on coming Tuesday morning for 3 hours.',
            description_bn: 'আগামী মঙ্গলবার সকালে বিশেষ পরিচ্ছন্নতা কাজের জন্য মন্দিরের গর্ভগৃহ ৩ ঘণ্টা বন্ধ থাকবে।',
            publish_date: '2026-11-01',
            expiry_date: '2026-11-15',
            is_pinned: 0,
            attachment_url: ''
        }
    ];

    const allNotices = [...apiNotices, ...staticNotices];

    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#23060b] text-stone-800 dark:text-cream-100 transition-colors duration-300">

            <div className='bg-maroon-900'>
                <div className="px-4 sm:px-6 pt-6 flex flex-wrap justify-between items-center gap-4">
                    <nav className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                        <Link to="/" className="hover:text-amber-300 transition-colors">
                            {t.breadcrumbHome}
                        </Link>
                        <span>/</span>
                        <span className="text-cream-200 font-semibold">
                            {t.breadcrumbNotices}
                        </span>
                    </nav>
                </div>

                <header className="text-amber-100 py-10 px-4 sm:px-6 mt-6 shadow-md text-center space-y-4">
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

            <main className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-6">
                {loading ? (
                    <div className="text-center py-20 text-stone-500">লোড হচ্ছে...</div>
                ) : (
                    allNotices.map((notice, index) => {
                    
                        const isTopNotice = index === 0 || notice.is_pinned === 1 || notice.is_pinned === true;

                        return (
                            <div
                                key={notice.id || index}
                                className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 border shadow-sm ${isTopNotice
                                        ? 'bg-amber-50/70 dark:bg-[#1a0408] border-amber-400 dark:border-amber-500/50 shadow-md ring-1 ring-amber-400/30'
                                        : 'bg-white dark:bg-[#1a0408] border-stone-200 dark:border-amber-500/20 hover:border-amber-400'
                                    }`}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1 ${isTopNotice
                                                ? 'bg-amber-600 text-white'
                                                : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
                                            }`}>
                                            {isTopNotice ? <Pin className="w-3.5 h-3.5 fill-current" /> : <Bell className="w-3.5 h-3.5" />}
                                            {isTopNotice ? t.badgePinned : (lang === 'bn' ? (notice.category_bn || 'সাধারণ') : (notice.category_en || 'General'))}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                                        <span>{t.publishedOn} {notice.publish_date || notice.publishDate}</span>
                                    </div>
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-amber-100 mb-3 hover:text-amber-700 transition-colors">
                                    {lang === 'bn' ? (notice.title_bn || notice.titleEn) : (notice.title_en || notice.titleBn)}
                                </h2>

                                <p className="text-stone-600 dark:text-cream-200/80 text-sm leading-relaxed mb-6">
                                    {lang === 'bn' ? (notice.description_bn || notice.descriptionEn) : (notice.description_en || notice.descriptionBn)}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                                    <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1">
                                        <span>{t.expiryOn}</span>
                                        <span className="font-medium text-stone-700 dark:text-stone-300">{notice.expiry_date || notice.expiryDate || 'N/A'}</span>
                                    </div>

                                    {(notice.attachment_url || notice.attachmentUrl) && (
                                        <a
                                            href={notice.attachment_url || notice.attachmentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition shadow-sm"
                                        >
                                            <Download className="w-3.5 h-3.5" /> {t.attachment}
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </main>
        </div>
    );
}