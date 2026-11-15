import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Sparkles, X, ZoomIn } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';

const UpcomingEvent = () => {
    const eventDate = new Date('2026-11-07T18:30:00');

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useLanguage();

    const imageUrl = "https://i.ibb.co.com/Y7nFSfyF/859643630-1102238592415202-5879781624406010636-n.jpg";

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const difference = eventDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <section className="relative bg-cream-200 dark:bg-[#1a0408] py-14 px-4 sm:px-6 lg:px-8 border-b border-maroon-800 dark:border-amber-500/20 transition-colors duration-300">
            <div className="max-w-350 mx-auto w-full">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-2">
                        <span className="h-[2px] w-8 sm:w-12 bg-amber-500 rounded-full" />
                        <span className="text-xs sm:text-sm font-semibold text-maroon-900 dark:text-amber-400 uppercase tracking-widest">
                            {t?.event?.tag || 'UPCOMING EVENT'}
                        </span>
                        <span className="h-[2px] w-8 sm:w-12 bg-amber-500 rounded-full" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-maroon-900 dark:text-cream-100">
                        {t?.event?.title || 'Upcoming Festival & Event'}
                    </h2>
                </div>

                <div className="bg-[#f3deb1] dark:bg-[#23060b] border border-transparent dark:border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="lg:col-span-6 relative group overflow-hidden rounded-xl shadow-md border-2 border-amber-500/40 h-[280px] sm:h-[340px] cursor-pointer"
                        >
                            <img
                                src={imageUrl}
                                alt="Shyama Puja Event"
                                className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-maroon-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-100/90 text-maroon-950 text-xs font-bold shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-all">
                                    <ZoomIn className="w-4 h-4 text-amber-600" /> {t?.event?.expandImage || 'Click to Expand Image'}
                                </span>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-950/80 via-maroon-950/20 to-transparent flex items-end p-4 pointer-events-none">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-maroon-950 text-xs font-bold shadow-sm">
                                    <Sparkles className="w-3.5 h-3.5" /> {t?.event?.badge || 'Special Festival'}
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-6 space-y-5 text-center lg:text-left">

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-maroon-800 dark:text-cream-200">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-300 dark:bg-maroon-900 border border-transparent dark:border-amber-500/20">
                                    <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" /> {t?.event?.dateText || 'November 7-8, 2026 (Sat & Sun)'}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-300 dark:bg-maroon-900 border border-transparent dark:border-amber-500/20">
                                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" /> {t?.event?.timeText || '6:30 PM Onwards'}
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-maroon-900 dark:text-cream-100 leading-tight">
                                {t?.event?.eventTitle || 'Shree Shree Shyama Puja & Annakut Mahotsav'}
                            </h3>

                            <p className="text-maroon-800 dark:text-cream-200/90 text-sm sm:text-base leading-relaxed">
                                {t?.event?.description || 'Organized by Golpahar Mohashoshan & Mandir Management Committee. Featuring Divine Shyama Maa Maha Puja, Evening Aarti, Religious Discussion, Clothes Distribution, and Cultural Program.'}
                            </p>

                            <div className="pt-2">
                                <p className="text-xs font-semibold text-maroon-800 dark:text-amber-400 uppercase tracking-wide mb-2">
                                    {t?.event?.startsIn || 'Event Starts In:'}
                                </p>
                                <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto lg:mx-0">
                                    <div className="bg-maroon-900 dark:bg-[#1a0408] border border-transparent dark:border-amber-500/30 text-amber-200 p-2.5 rounded-xl text-center shadow-xs">
                                        <span className="block text-lg sm:text-xl font-bold font-heading">{timeLeft.days}</span>
                                        <span className="text-[10px] uppercase opacity-80">{t?.event?.days || 'Days'}</span>
                                    </div>
                                    <div className="bg-maroon-900 dark:bg-[#1a0408] border border-transparent dark:border-amber-500/30 text-amber-200 p-2.5 rounded-xl text-center shadow-xs">
                                        <span className="block text-lg sm:text-xl font-bold font-heading">{timeLeft.hours}</span>
                                        <span className="text-[10px] uppercase opacity-80">{t?.event?.hours || 'Hours'}</span>
                                    </div>
                                    <div className="bg-maroon-900 dark:bg-[#1a0408] border border-transparent dark:border-amber-500/30 text-amber-200 p-2.5 rounded-xl text-center shadow-xs">
                                        <span className="block text-lg sm:text-xl font-heading font-bold">{timeLeft.minutes}</span>
                                        <span className="text-[10px] uppercase opacity-80">{t?.event?.mins || 'Mins'}</span>
                                    </div>
                                    <div className="bg-maroon-900 dark:bg-[#1a0408] border border-transparent dark:border-amber-500/30 text-amber-200 p-2.5 rounded-xl text-center shadow-xs">
                                        <span className="block text-lg sm:text-xl font-heading font-bold">{timeLeft.seconds}</span>
                                        <span className="text-[10px] uppercase opacity-80">{t?.event?.secs || 'Secs'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <Link to="/upcoming-events" className="btn-primary">
                                    <span>{t?.event?.viewSchedule || 'View Full Schedule'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            {isModalOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 animate-fadeIn"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-maroon-950/90 border border-amber-500/30 rounded-2xl p-2 sm:p-4 shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-amber-200 hover:bg-maroon-900 hover:text-white transition-colors z-10 cursor-pointer"
                            aria-label="Close Preview"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <img
                            src={imageUrl}
                            alt="Expanded Event Banner"
                            className="max-w-full max-h-[82vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default UpcomingEvent;