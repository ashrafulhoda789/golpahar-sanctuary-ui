import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const templeImages = [
    {
        url: "https://i.ibb.co.com/tw9CgxkX/temple1.jpg",
        caption: "গোলপাহাড় মহাশ্মশান কালী মন্দির"
    },
    {
        url: "https://i.ibb.co.com/nMC51Pmn/temple2.webp",
        caption: "সন্ধ্যা আরতি"
    },
    {
        url: "https://i.ibb.co.com/ZpDhhp2K/temple3.webp",
        caption: "মন্দির প্রাঙ্গণ"
    }
];

const aartiSchedule = [
    { name: "Mangal Aarti", start: "04:00", end: "05:00" },
    { name: "Bhog Offering", start: "12:00", end: "13:00" },
    { name: "Sandhya Aarti", start: "18:00", end: "19:30" },
    { name: "Shayan Aarti", start: "21:00", end: "21:30" }
];

const getAartiStatus = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTotalMins = currentHours * 60 + currentMinutes;

    for (const aarti of aartiSchedule) {
        const [startH, startM] = aarti.start.split(':').map(Number);
        const [endH, endM] = aarti.end.split(':').map(Number);
        const startTotalMins = startH * 60 + startM;
        const endTotalMins = endH * 60 + endM;

        if (currentTotalMins >= startTotalMins && currentTotalMins <= endTotalMins) {
            return {
                active: true,
                name: aarti.name,
                time: `${aarti.start} - ${aarti.end}`,
                countdownText: null
            };
        }
    }

    let nextAarti = aartiSchedule[0];
    let minDiff = Infinity;

    for (const aarti of aartiSchedule) {
        const [startH, startM] = aarti.start.split(':').map(Number);
        let startTotalMins = startH * 60 + startM;

        if (startTotalMins <= currentTotalMins) {
            startTotalMins += 24 * 60;
        }

        const diff = startTotalMins - currentTotalMins;
        if (diff < minDiff) {
            minDiff = diff;
            nextAarti = aarti;
        }
    }
    const hoursLeft = Math.floor(minDiff / 60);
    const minsLeft = minDiff % 60;

    let countdownStr = "";
    if (hoursLeft > 0) {
        countdownStr += `${hoursLeft}h `;
    }
    countdownStr += `${minsLeft}m left`;

    return {
        active: false,
        name: nextAarti.name,
        time: `${nextAarti.start} - ${nextAarti.end}`,
        countdownText: countdownStr
    };
};

const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentAarti, setCurrentAarti] = useState(getAartiStatus);
    const { t } = useLanguage();

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % templeImages.length);
        }, 4000);

        const aartiTimer = setInterval(() => {
            setCurrentAarti(getAartiStatus());
        }, 30000);

        return () => {
            clearInterval(slideTimer);
            clearInterval(aartiTimer);
        };
    }, []);

    const getLocalizedAartiName = (key, defaultName) => {
        return t?.hero?.[key] || defaultName;
    };

    const prevSlide = () =>
        setCurrentIndex((prev) => (prev === 0 ? templeImages.length - 1 : prev - 1));

    const nextSlide = () =>
        setCurrentIndex((prev) => (prev + 1) % templeImages.length);

    return (
        <section className="relative bg-cream-100 dark:bg-[#23060b] min-h-svh overflow-hidden py-0 transition-colors duration-300">

            <div className="w-full h-full flex flex-col lg:flex-row items-stretch lg:min-h-[calc(100svh-160px)]">

                <div className="relative z-10 lg:w-[55%] bg-cream-100 dark:bg-[#23060b] flex flex-col justify-center items-center lg:items-start px-5 sm:px-10 lg:pl-20 lg:pr-12 pt-6 pb-8 lg:py-12 text-left transition-colors duration-300">

                    <div className="flex items-center justify-start gap-3 mb-3 lg:mb-4">
                        <span className="h-px w-8 sm:w-10 bg-amber-500" />
                        <span className="text-xs sm:text-base font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                            {t?.hero?.welcome || 'WELCOME'}
                        </span>
                    </div>

                    <h1 className="font-heading text-center lg:text-start font-bold text-maroon-900 dark:text-cream-100 leading-[1.2] space-y-4">
                        <span className="text-3xl sm:text-5xl xl:text-[80px] block">{t?.hero?.title1 || 'Golpahar'}</span>
                        <span className="text-3xl sm:text-5xl xl:text-7xl block">{t?.hero?.title2 || 'Mohashoshan'}</span>
                        <span className="text-amber-600 dark:text-amber-400 text-3xl sm:text-5xl xl:text-6xl block">{t?.hero?.title3 || 'Kali Mandir'}</span>
                    </h1>

                    <p className="mt-4 lg:mt-5 text-sm sm:text-base text-maroon-800 dark:text-cream-200/90 leading-relaxed max-w-xl">
                        {t?.hero?.description || 'A place of prayer, peace and community. Dedicated to divine worship, spiritual awakening, and selfless social welfare in Chittagong.'}
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
                                            {t?.hero?.runningAirthis || "Running Arthi's"}
                                        </>
                                    ) : (
                                        <>
                                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                                            {t?.hero?.nextArthi || "Next Arthi"}
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
                                <span>{getLocalizedAartiName(currentAarti.key, currentAarti.name)}</span>
                                <span className="block sm:inline sm:ml-1.5 text-[11px] sm:text-xs font-normal text-cream-200/80">
                                    ({currentAarti.time})
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="relative group lg:w-[45%] w-full h-80 sm:h-112.5 lg:h-auto min-h-75 flex-1 mr-0">

                    <div className="absolute inset-0 bg-maroon-900 dark:bg-black overflow-hidden">
                        {templeImages.map((image, index) => (
                            <img
                                key={image.url}
                                src={image.url}
                                alt={image.caption}
                                className={`absolute inset-0 w-full h-full object-fill transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}

                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(74, 14, 23, 0.4) 0%, rgba(74, 14, 23, 0.1) 50%, rgba(74, 14, 23, 0.6) 100%)",
                            }}
                        />
                    </div>

                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-maroon-900/95 border border-amber-500/40 text-white text-xs sm:text-sm font-medium shadow-md z-20">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t?.hero?.locationText || 'Golpahar, Chattogram'}</span>
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/40 text-amber-200 hover:bg-black/70 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all z-30 cursor-pointer"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 text-amber-200 hover:bg-black/70 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all z-30 cursor-pointer"
                        aria-label="Next Slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {templeImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${index === currentIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/60'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroBanner;