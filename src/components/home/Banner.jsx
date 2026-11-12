/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchSiteSettings } from '../../lib/api/contents';

const fallbackTempleImages = [
    {
        url: "https://i.ibb.co.com/tw9CgxkX/temple1.jpg",
        caption_en: "Golpahar Mohashoshan Kali Mandir",
        caption_bn: "গোলপাহাড় মহাশ্মশান কালী মন্দির"
    },
    {
        url: "https://i.ibb.co.com/nMC51Pmn/temple2.webp",
        caption_en: "Evening Aarti",
        caption_bn: "সন্ধ্যা আরতি"
    },
    {
        url: "https://i.ibb.co.com/ZpDhhp2K/temple3.webp",
        caption_en: "Temple Premises",
        caption_bn: "মন্দির প্রাঙ্গণ"
    }
];

const fallbackAartiSchedule = [
    { title_en: "Mangal Aarti", title_bn: "মঙ্গলারতি", time: "04:00 AM", start: "04:00", end: "05:00" },
    { title_en: "Bhog Offering", title_bn: "ভোগ নিবেদন", time: "12:30 PM", start: "12:00", end: "13:00" },
    { title_en: "Sandhya Aarti", title_bn: "সন্ধ্যা আরতি", time: "06:00 PM", start: "18:00", end: "19:30" },
    { title_en: "Shayan Aarti", title_bn: "শয়ন আরতি", time: "09:00 PM", start: "21:00", end: "21:30" }
];


const parseTimeToMins = (timeStr) => {
    if (!timeStr) return null;

    const ampmMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (ampmMatch) {
        let [, h, m, period] = ampmMatch;
        let hours = parseInt(h, 10);
        const minutes = parseInt(m, 10);
        if (period.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
    }

    const parts = timeStr.split(':').map(Number);
    if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parts[0] * 60 + parts[1];
    }
    return null;
};

const getAartiStatus = (schedule, lang) => {
    if (!schedule || schedule.length === 0) {
        schedule = fallbackAartiSchedule;
    }

    const now = new Date();
    const currentTotalMins = now.getHours() * 60 + now.getMinutes();

    for (const aarti of schedule) {
        // Fallback to parsing 'time' field if start/end are missing
        const startTimeStr = aarti.start || aarti.time;
        const startTotalMins = parseTimeToMins(startTimeStr);
        const endTotalMins = aarti.end ? parseTimeToMins(aarti.end) : (startTotalMins !== null ? startTotalMins + 60 : null);

        if (startTotalMins === null || endTotalMins === null) continue;

        if (currentTotalMins >= startTotalMins && currentTotalMins <= endTotalMins) {
            return {
                active: true,
                name: lang === 'bn' ? (aarti.title_bn || aarti.title_en) : (aarti.title_en || aarti.title_bn),
                time: aarti.time || `${aarti.start} - ${aarti.end}`,
                countdownText: null
            };
        }
    }

    let nextAarti = schedule[0];
    let minDiff = Infinity;

    for (const aarti of schedule) {
        const startTimeStr = aarti.start || aarti.time;
        let startTotalMins = parseTimeToMins(startTimeStr);
        if (startTotalMins === null) continue;

        if (startTotalMins <= currentTotalMins) {
            startTotalMins += 24 * 60;
        }

        const diff = startTotalMins - currentTotalMins;
        if (diff < minDiff) {
            minDiff = diff;
            nextAarti = aarti;
        }
    }

    if (minDiff === Infinity) minDiff = 0;

    const hoursLeft = Math.floor(minDiff / 60);
    const minsLeft = minDiff % 60;

    let countdownStr = "";
    if (hoursLeft > 0) {
        countdownStr += `${hoursLeft}h `;
    }
    countdownStr += `${minsLeft}m left`;

    return {
        active: false,
        name: nextAarti ? (lang === 'bn' ? (nextAarti.title_bn || nextAarti.title_en) : (nextAarti.title_en || nextAarti.title_bn)) : "Aarti",
        time: nextAarti ? (nextAarti.time || `${nextAarti.start} - ${nextAarti.end}`) : "",
        countdownText: countdownStr
    };
};

const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [heroData, setHeroData] = useState(null);
    const [arthiList, setArthiList] = useState(fallbackAartiSchedule);
    const { t, lang } = useLanguage();
    const [currentAarti, setCurrentAarti] = useState(() => getAartiStatus(fallbackAartiSchedule, lang));

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetchSiteSettings();
                const settings = response?.data || response;
                
                if (settings) {
                    if (settings.hero) {
                        setHeroData(settings.hero);
                    }

                    if (settings.arthiSchedule && settings.arthiSchedule.length > 0) {
                        setArthiList(settings.arthiSchedule);
                        setCurrentAarti(getAartiStatus(settings.arthiSchedule, lang));
                    }
                }
            } catch (err) {
                console.error("Failed to load hero settings from backend, using fallback.", err);
            }
        }
        loadData();
    }, [lang]);

    useEffect(() => {
        setCurrentAarti(getAartiStatus(arthiList, lang));
    }, [lang, arthiList]);

    const templeImages = (heroData?.images && heroData.images.length > 0 && heroData.images.some(img => img.url && img.url.trim() !== ""))
        ? heroData.images.filter(img => img.url && img.url.trim() !== "")
        : fallbackTempleImages;

    useEffect(() => {
        if (currentIndex >= templeImages.length) {
            setCurrentIndex(0);
        }
    }, [templeImages.length, currentIndex]);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % templeImages.length);
        }, 4000);

        const aartiTimer = setInterval(() => {
            setCurrentAarti(getAartiStatus(arthiList, lang));
        }, 30000);

        return () => {
            clearInterval(slideTimer);
            clearInterval(aartiTimer);
        };
    }, [arthiList, templeImages.length, lang]);

    const prevSlide = () =>
        setCurrentIndex((prev) => (prev === 0 ? templeImages.length - 1 : prev - 1));

    const nextSlide = () =>
        setCurrentIndex((prev) => (prev + 1) % templeImages.length);

    const rawTitle = lang === 'bn'
        ? (heroData?.title_bn || `${t?.hero?.title1 || ''} ${t?.hero?.title2 || ''} ${t?.hero?.title3 || ''}`.trim())
        : (heroData?.title_en || 'Golpahar Mohashoshan Kali Mandir');

    let part1 = lang === 'bn' ? (t?.hero?.title1 || 'গোলপাহাড়') : 'Golpahar';
    let part2 = lang === 'bn' ? (t?.hero?.title2 || 'মহাশ্মশান') : 'Mohashoshan';
    let part3 = lang === 'bn' ? (t?.hero?.title3 || 'কালী মন্দির') : 'Kali Mandir';

    if (rawTitle) {
        const words = rawTitle.trim().split(/\s+/);
        part1 = words[0] || '';
        part2 = words[1] || '';
        part3 = words.slice(2).join(' ') || '';
    }

    const bannerDescription = lang === 'bn'
        ? (heroData?.description_bn || t?.hero?.description)
        : (heroData?.description_en || t?.hero?.description || 'A place of prayer, peace and community. Dedicated to divine worship, spiritual awakening, and selfless social welfare in Chittagong.');

    return (
        <section className="relative bg-cream-100 dark:bg-[#23060b] min-h-svh lg:min-h-[calc(100svh-160px)] overflow-hidden py-0 transition-colors duration-300">
            <div className="w-full h-full flex flex-col lg:flex-row items-stretch lg:min-h-[calc(100svh-160px)]">

                <div className="relative z-10 lg:w-[55%] bg-cream-100 dark:bg-[#23060b] flex flex-col justify-center items-center lg:items-start px-5 sm:px-10 lg:pl-20 lg:pr-12 pt-6 pb-8 lg:py-12 text-left transition-colors duration-300">

                    <div className="flex items-center justify-start gap-3 mb-3 lg:mb-4">
                        <span className="h-px w-8 sm:w-10 bg-amber-500" />
                        <span className="text-xs sm:text-base font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                            {t?.hero?.welcome || 'WELCOME'}
                        </span>
                    </div>

                    <h1 className="font-heading text-center lg:text-start font-bold text-maroon-900 dark:text-cream-100 leading-[1.2] space-y-4">
                        <span className="text-3xl sm:text-5xl xl:text-[80px] block">
                            {part1}
                        </span>
                        <span className="text-3xl sm:text-5xl xl:text-7xl block">
                            {part2}
                        </span>
                        <span className="text-amber-600 dark:text-amber-400 text-3xl sm:text-5xl xl:text-6xl block">
                            {part3}
                        </span>
                    </h1>

                    <p className="mt-4 lg:mt-5 text-sm sm:text-base text-maroon-800 dark:text-cream-200/90 leading-relaxed max-w-xl">
                        {bannerDescription}
                    </p>

                    <div className="mt-6 lg:mt-8 flex flex-wrap items-center justify-start gap-3 sm:gap-4">
                        <Link to="/" className="btn-primary">
                            <span>{t?.hero?.bookPuja || 'Book Puja'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link to="/" className="btn-outline">
                            <Calendar className="w-4 h-4" />
                            <span>{t?.hero?.donateNow || 'Donate Now'}</span>
                        </Link>
                    </div>

                    {/* Dynamic Aarti Status Card */}
                    <div className="mt-6 flex items-center gap-3.5 p-3.5 rounded-2xl bg-maroon-900 dark:bg-[#1a0408] border border-amber-500/30 shadow-md backdrop-blur-sm w-full max-w-lg">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner shrink-0">
                            {currentAarti.active ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between gap-1.5">
                                <div className="flex items-center gap-1.5">
                                    {currentAarti.active ? (
                                        <>
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                            {lang === 'bn' ? 'চলমান আরতি' : "Running Aarti"}
                                        </>
                                    ) : (
                                        <>
                                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                                            {lang === 'bn' ? 'পরবর্তী আরতি' : "Next Aarti"}
                                        </>
                                    )}
                                </div>
                                {!currentAarti.active && currentAarti.countdownText && (
                                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold">
                                        {t?.hero?.timeRemaining
                                            ? t.hero.timeRemaining.replace('{time}', currentAarti.countdownText)
                                            : `${currentAarti.countdownText} left`}
                                    </span>
                                )}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-cream-100 mt-0.5">
                                <span>{currentAarti.name}</span>
                                {currentAarti.time && (
                                    <span className="block sm:inline sm:ml-1.5 text-[11px] sm:text-xs font-normal text-cream-200/80">
                                        ({currentAarti.time})
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="relative group lg:w-[45%] w-full h-80 sm:h-112.5 lg:h-auto min-h-75 flex-1 overflow-hidden bg-[#2b1015]">
                    {templeImages.map((image, index) => {
                        const imageCaption = lang === 'bn'
                            ? (image.caption_bn || image.caption || 'মন্দির প্রাঙ্গণ')
                            : (image.caption_en || image.caption || 'Temple View');

                        return (
                            <div
                                key={image.url || index}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentIndex
                                    ? 'opacity-100 scale-100 z-10'
                                    : 'opacity-0 scale-[1.03] z-0'
                                }`}
                            >
                                <img
                                    src={image.url}
                                    alt={imageCaption}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    decoding="async"
                                    draggable="false"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        );
                    })}

                    <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#21080d]/75 via-transparent to-black/20" />

                    <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/25 backdrop-blur-md border border-white/20">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-white text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase">
                                Sacred Heritage
                            </span>
                        </div>
                    </div>

                    <div className="absolute bottom-16 sm:bottom-20 left-5 sm:left-8 z-20 max-w-[75%]">
                        <div className="w-10 h-[2px] bg-amber-400 mb-3" />

                        <p
                            key={currentIndex}
                            className="text-white text-lg sm:text-2xl font-semibold font-heading drop-shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-700"
                        >
                            {lang === 'bn'
                                ? (templeImages[currentIndex]?.caption_bn ||
                                    templeImages[currentIndex]?.caption ||
                                    'মন্দির প্রাঙ্গণ')
                                : (templeImages[currentIndex]?.caption_en ||
                                    templeImages[currentIndex]?.caption ||
                                    'Temple View')}
                        </p>

                        <p className="text-white/70 text-xs sm:text-sm mt-1 tracking-wide">
                            Golpahar, Chattogram
                        </p>
                    </div>

                    <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-medium shadow-lg z-20">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>{t?.hero?.locationText || 'Golpahar, Chattogram'}</span>
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-black/25 backdrop-blur-md border border-white/20 text-white hover:bg-amber-500 hover:text-maroon-950 hover:border-amber-500 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 cursor-pointer"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-black/25 backdrop-blur-md border border-white/20 text-white hover:bg-amber-500 hover:text-maroon-950 hover:border-amber-500 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 cursor-pointer"
                        aria-label="Next Slide"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                        {templeImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${index === currentIndex
                                    ? 'w-8 bg-amber-400'
                                    : 'w-1.5 bg-white/60 hover:bg-white'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 text-white/90 text-xs font-medium tracking-widest">
                        <span className="text-amber-400">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="mx-1.5 text-white/50">/</span>
                        {String(templeImages.length).padStart(2, '0')}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default HeroBanner;