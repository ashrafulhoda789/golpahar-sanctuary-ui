import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Sun, Utensils, Flame, Moon, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ArthiSchedule = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentTimeKey, setCurrentTimeKey] = useState('');
    const { t, lang } = useLanguage();

    const arthiSchedule = [
        {
            title: t?.aarti?.mangal?.title || "Mangal Aarti",
            time: t?.aarti?.mangal?.time || "4:00 AM",
            start: "04:00",
            end: "05:00",
            desc: t?.aarti?.mangal?.desc || "Prabhuna divya darshan ane mangal aarti.",
            icon: Sun
        },
        {
            title: t?.aarti?.bhog?.title || "Bhog Offering",
            time: t?.aarti?.bhog?.time || "12:30 PM",
            start: "12:00",
            end: "13:30",
            desc: t?.aarti?.bhog?.desc || "Mahaprabhune bhog dhruvavani vidhi.",
            icon: Utensils
        },
        {
            title: t?.aarti?.sandhya?.title || "Sandhya Aarti",
            time: t?.aarti?.sandhya?.time || "6:30 PM",
            start: "18:00",
            end: "19:30",
            desc: t?.aarti?.sandhya?.desc || "Sanjni divya aarti ane mahapuja.",
            icon: Flame
        },
        {
            title: t?.aarti?.shayan?.title || "Shital Bhog & Shayan",
            time: t?.aarti?.shayan?.time || "8:00 PM",
            start: "20:00",
            end: "21:30",
            desc: t?.aarti?.shayan?.desc || "Ratrina samaye shital bhog ane shayan darshan.",
            icon: Moon
        }
    ];

    useEffect(() => {
        const checkActiveAarti = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const currentFormatted = `${hours}:${minutes}`;

            setCurrentTimeKey(currentFormatted);
        };

        checkActiveAarti();
        const timer = setInterval(checkActiveAarti, 60000);
        return () => clearInterval(timer);
    }, []);

    const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysOfWeekBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্রবার', 'শনি'];
    const daysOfWeek = lang === 'bn' ? daysOfWeekBn : daysOfWeekEn;

    const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNamesBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const monthNames = lang === 'bn' ? monthNamesBn : monthNamesEn;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
        <section className="relative bg-cream-200 dark:bg-[#1a0408] transition-colors duration-300 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-320 mx-auto w-full">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-2">
                        <span className="h-[2px] w-8 sm:w-12 bg-amber-500 rounded-full" />
                        <span className="text-xs sm:text-sm font-semibold text-maroon-900 dark:text-amber-400 uppercase tracking-widest">
                            {t?.aarti?.tag || 'DAILY RITUALS'}
                        </span>
                        <span className="h-[2px] w-8 sm:w-12 bg-amber-500 rounded-full" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-maroon-900 dark:text-cream-100">
                        {t?.aarti?.title || 'Divine Timings & Sacred Calendar'}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    <div className="lg:col-span-5 bg-[#f3deb1] dark:bg-[#23060b] border border-transparent dark:border-amber-500/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-300">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-maroon-900/10 dark:border-amber-500/20 mb-6">
                                <div className="flex items-center gap-2 text-maroon-900 dark:text-cream-100 font-heading font-bold text-lg">
                                    <CalendarIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    <span>{monthNames[month]} {year}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-cream-300 dark:hover:bg-[#4a0e17] text-maroon-900 dark:text-cream-100 transition-colors cursor-pointer">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-cream-300 dark:hover:bg-[#4a0e17] text-maroon-900 dark:text-cream-100 transition-colors cursor-pointer">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 text-center">
                                {daysOfWeek.map((day) => (
                                    <span key={day} className="text-xs font-semibold text-maroon-800 dark:text-amber-400/80 py-1">
                                        {day}
                                    </span>
                                ))}

                                {Array.from({ length: firstDayIndex }).map((_, index) => (
                                    <div key={`empty-${index}`} />
                                ))}

                                {Array.from({ length: totalDays }).map((_, index) => {
                                    const dayNum = index + 1;
                                    const isToday =
                                        dayNum === new Date().getDate() &&
                                        month === new Date().getMonth() &&
                                        year === new Date().getFullYear();

                                    return (
                                        <div
                                            key={dayNum}
                                            className={`h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${isToday
                                                ? 'bg-maroon-900 text-amber-200 dark:bg-amber-400 dark:text-maroon-950 shadow-md font-bold'
                                                : 'text-gray-800 dark:text-cream-100 hover:bg-cream-300/70 dark:hover:bg-[#4a0e17]'
                                                }`}
                                        >
                                            {dayNum}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-[#f3deb1] dark:bg-[#23060b] border border-transparent dark:border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between transition-colors duration-300">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-maroon-900/10 dark:border-amber-500/20 mb-6">
                                <div className="flex items-center gap-2.5">
                                    <Clock className="w-6 h-6 text-maroon-900 dark:text-amber-400" />
                                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-maroon-900 dark:text-cream-100 tracking-wide">
                                        {t?.aarti?.scheduleHeader || 'ARTHI SCHEDULE'}
                                    </h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {arthiSchedule.map((item, index) => {
                                    const IconComponent = item.icon;
                                    const isLiveNow = currentTimeKey >= item.start && currentTimeKey <= item.end;

                                    return (
                                        <div
                                            key={index}
                                            className={`rounded-xl p-4 sm:p-5 transition-all flex flex-col justify-between group relative overflow-hidden text-white ${isLiveNow
                                                    ? 'bg-[#40020d] dark:bg-[#4a0e17] border-2 border-amber-400 shadow-xl scale-[1.02]'
                                                    : 'bg-[#750619] dark:bg-[#34080e] shadow-xs hover:shadow-md'
                                                }`}
                                        >
                                            {isLiveNow && (
                                                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-maroon-900 text-[10px] font-extrabold uppercase tracking-wider animate-pulse shadow-sm z-10">
                                                    <Sparkles className="w-3 h-3" />
                                                    <span>{t?.aarti?.liveNow || 'Live Now'}</span>
                                                </div>
                                            )}

                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className={`p-2 rounded-lg transition-colors ${isLiveNow ? 'bg-amber-400 text-maroon-950' : 'bg-cream-200 text-maroon-900 group-hover:bg-maroon-900 group-hover:text-amber-200 dark:bg-maroon-900 dark:text-amber-400'}`}>
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    {!isLiveNow && (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-maroon-900 dark:bg-[#23060b] border border-transparent dark:border-amber-500/20 text-xs font-semibold">
                                                            {item.time}
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 className={`font-heading font-bold text-lg mb-1 transition-colors ${isLiveNow ? 'text-amber-300' : 'group-hover:text-amber-300'}`}>
                                                    {item.title}
                                                </h4>

                                                {isLiveNow && (
                                                    <div className="text-xs font-semibold text-amber-300/90 mb-1">
                                                        {t?.aarti?.timeLabel || 'Time'}: {item.time}
                                                    </div>
                                                )}

                                                <p className="text-xs sm:text-sm leading-relaxed text-cream-100/90">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ArthiSchedule;