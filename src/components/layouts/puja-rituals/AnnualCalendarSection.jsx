import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles, X, CalendarDays } from 'lucide-react';

const samplePujas = [
    { date: '2026-01-15', title_en: 'Makar Sankranti Puja', title_bn: 'মকর সংক্রান্তি পূজা' },
    { date: '2026-02-15', title_en: 'Shivaratri Brata', title_bn: 'শিবচতুর্দশী ব্রত' },
    { date: '2026-03-20', title_en: 'Basanti Puja', title_bn: 'বাসন্তী পূজা' },
    { date: '2026-04-14', title_en: 'Chaitra Sankranti', title_bn: 'চৈত্র সংক্রান্তি' },
    { date: '2026-08-15', title_en: 'Janmashtami', title_bn: 'শ্রীকৃষ্ণাষ্টমী' },
    { date: '2026-10-20', title_en: 'Durga Puja Maha Saptami', title_bn: 'মহা সপ্তমী পূজা' },
    { date: '2026-10-21', title_en: 'Durga Puja Maha Ashtami', title_bn: 'মহা অষ্টমী পূজা' },
    { date: '2026-10-22', title_en: 'Maha Navami & Dashami', title_bn: 'মহানবমী ও বিজয়া দশমী' },
    { date: '2026-11-08', title_en: 'Kali Puja & Amavasya', title_bn: 'কালীপূজা ও দীপাবলি' },
    { date: '2026-12-25', title_en: 'Gita Jayanti', title_bn: 'গীতা জয়ন্তী' }
];

const monthsListEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const monthsListBn = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

export default function AnnualCalendarSection({ lang = 'en', pujas = samplePujas }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0 - 11
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const [selectedDateInfo, setSelectedDateInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const calendarDays = useMemo(() => {
        const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        let daysArray = [];

        for (let i = 0; i < firstDayIndex; i++) {
            daysArray.push({ day: null, dateString: null });
        }

        for (let d = 1; d <= totalDays; d++) {
            const formattedMonth = String(currentMonth + 1).padStart(2, '0');
            const formattedDay = String(d).padStart(2, '0');
            const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
            daysArray.push({ day: d, dateString });
        }

        return daysArray;
    }, [currentMonth, currentYear]);

    const getPujaForDate = (dateString) => {
        if (!dateString) return null;
        return pujas.find((p) => p.date === dateString);
    };

    const handleDateClick = (item) => {
        if (!item.dateString) return;
        const puja = getPujaForDate(item.dateString);
        setSelectedDateInfo({
            date: item.dateString,
            puja: puja ? (lang === 'bn' ? puja.title_bn : puja.title_en) : (lang === 'bn' ? 'কোনো বিশেষ পূজা নির্ধারিত নেই' : 'No special puja scheduled')
        });
        setIsModalOpen(true);
    };

    const monthName = lang === 'bn' ? monthsListBn[currentMonth] : monthsListEn[currentMonth];
    const weekDays = lang === 'bn'
        ? ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <section className="bg-cream-200 dark:bg-maroon-900 py-8">
            <div className='max-w-6xl mx-auto '>
                <div className="text-center space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-amber-600/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-500/30">
                        <CalendarIcon className="w-3.5 h-3.5" /> Annual Calendar
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100">
                        {lang === 'bn' ? 'বার্ষিক পূজার ক্যালেন্ডার' : 'Annual Puja Calendar'}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-cream-200/70 max-w-xl mx-auto">
                        {lang === 'bn' ? 'তারিখে ক্লিক করে বিস্তারিত দেখতে পারেন।' : 'Click on any date to view scheduled puja details.'}
                    </p>
                </div>

                <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-sm">

                    {/* Month Toggle Bar */}
                    <div className="flex justify-between items-center bg-amber-50/60 dark:bg-[#23060b] px-4 sm:px-6 py-3.5 rounded-2xl border border-amber-500/20 mb-6">
                        <button
                            onClick={handlePrevMonth}
                            className="p-2 rounded-xl bg-white dark:bg-[#1a0408] text-stone-700 dark:text-amber-300 border border-stone-200 dark:border-amber-500/30 hover:bg-amber-50 transition-all cursor-pointer"
                            aria-label="Previous Month"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#7c1d1d] dark:text-amber-100 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-600" /> {monthName} {currentYear}
                        </h3>

                        <button
                            onClick={handleNextMonth}
                            className="p-2 rounded-xl bg-white dark:bg-[#1a0408] text-stone-700 dark:text-amber-300 border border-stone-200 dark:border-amber-500/30 hover:bg-amber-50 transition-all cursor-pointer"
                            aria-label="Next Month"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-3 text-center">
                        {weekDays.map((day, idx) => (
                            <div key={idx} className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((item, index) => {
                            const puja = getPujaForDate(item.dateString);
                            const isToday = item.dateString === new Date().toISOString().split('T')[0];

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleDateClick(item)}
                                    className={`min-h-[85px] sm:min-h-[100px] p-2 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${!item.day
                                            ? 'bg-transparent border-transparent pointer-events-none'
                                            : puja
                                                ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/50 hover:border-amber-600 shadow-xs'
                                                : isToday
                                                    ? 'bg-stone-100 dark:bg-[#23060b] border-[#7c1d1d] hover:border-amber-500'
                                                    : 'bg-stone-50/50 dark:bg-[#1f0509]/50 border-stone-200 dark:border-amber-500/15 hover:border-amber-400'
                                        }`}
                                >
                                    {item.day && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className={`text-xs font-bold ${isToday ? 'w-6 h-6 rounded-full bg-[#7c1d1d] text-white flex items-center justify-center' : 'text-stone-700 dark:text-cream-100'}`}>
                                                    {item.day}
                                                </span>
                                                {puja && (
                                                    <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                                                )}
                                            </div>

                                            {puja ? (
                                                <div className="mt-1 p-1.5 rounded-xl bg-amber-600 text-white text-[10px] sm:text-xs font-semibold leading-tight shadow-2xs overflow-hidden">
                                                    <p className="line-clamp-2">
                                                        {lang === 'bn' ? puja.title_bn : puja.title_en}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="flex-1" />
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>


            {isModalOpen && selectedDateInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="relative w-full max-w-sm bg-[#fdfbf7] dark:bg-[#23060b] border border-amber-500/30 rounded-3xl shadow-2xl p-6 space-y-5">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-stone-200/80 dark:bg-maroon-900 text-stone-700 dark:text-amber-300 hover:scale-105 transition-all cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-amber-600/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                                <CalendarDays className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600">
                                    {lang === 'bn' ? 'তারিখের বিবরণ' : 'Date Details'}
                                </span>
                                <h4 className="text-base font-bold text-stone-900 dark:text-amber-100">
                                    {selectedDateInfo.date}
                                </h4>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-stone-100 dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/20">
                            <span className="text-xs text-stone-500 dark:text-cream-200/60 block mb-1 font-medium">
                                {lang === 'bn' ? 'পূজা বা অনুষ্ঠান:' : 'Puja / Event:'}
                            </span>
                            <p className="text-sm font-bold text-[#7c1d1d] dark:text-amber-200">
                                {selectedDateInfo.puja}
                            </p>
                        </div>

                        <div className="text-center pt-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all cursor-pointer"
                            >
                                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </section>
    );
}