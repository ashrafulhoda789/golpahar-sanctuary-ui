import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Sun, Utensils, Flame, Moon } from 'lucide-react';

const ArthiSchedule = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const arthiSchedule = [
        { title: "Mangal Aarti", time: "4:00 AM", desc: "Prabhuna divya darshan ane mangal aarti.", icon: Sun },
        { title: "Bhog Offering", time: "12:30 PM", desc: "Mahaprabhune bhog dhruvavani vidhi.", icon: Utensils },
        { title: "Sandhya Aarti", time: "6:30 PM", desc: "Sanjni divya aarti ane mahapuja.", icon: Flame },
        { title: "Shital Bhog & Shayan", time: "8:00 PM", desc: "Ratrina samaye shital bhog ane shayan darshan.", icon: Moon }
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
        <section className="relative bg-cream-200 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-350 mx-auto w-full">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-2">
                        <span className="h-[2px] w-8 sm:w-12 bg-amber-500 rounded-full" />
                        <span className="text-xs sm:text-sm font-semibold text-maroon-900 uppercase tracking-widest">
                            DAILY RITUALS
                        </span>
                        <span className="h-[2px] w-8 sm:w-12 bg-amber-500 rounded-full" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-maroon-900">
                        Divine Timings & Sacred Calendar
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    <div className="lg:col-span-5 bg-[#f3deb1] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-cream-300 mb-6">
                                <div className="flex items-center gap-2 text-maroon-900 font-heading font-bold text-lg">
                                    <CalendarIcon className="w-5 h-5 text-amber-600" />
                                    <span>{monthNames[month]} {year}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={prevMonth} className="p-1.5 rounded-full hover:bg-cream-300 text-maroon-900 transition-colors">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button onClick={nextMonth} className="p-1.5 rounded-full hover:bg-cream-300 text-maroon-900 transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 text-center">
                                {daysOfWeek.map((day) => (
                                    <span key={day} className="text-xs font-semibold text-maroon-800 py-1">
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
                                                    ? 'bg-maroon-900 text-amber-200 shadow-md font-bold'
                                                    : 'text-gray-800 hover:bg-cream-300/70'
                                                }`}
                                        >
                                            {dayNum}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-[#f3deb1] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">

                        <div>
                            <div className="flex items-center gap-2.5 pb-4 border-b border-cream-300 mb-6">
                                <Clock className="w-6 h-6 text-maroon-900" />
                                <h3 className="text-xl sm:text-2xl font-heading font-bold text-maroon-900 tracking-wide">
                                    ARTHI SCHEDULE
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {arthiSchedule.map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="bg-[#750619] text-white rounded-xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="p-2 rounded-lg bg-cream-200 text-maroon-900 group-hover:bg-maroon-900 group-hover:text-amber-200 transition-colors">
                                                        <IconComponent className="w-5 h-5" />
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-maroon-900 text-xs font-semibold">
                                                        {item.time}
                                                    </span>
                                                </div>
                                                <h4 className="font-heading font-bold text-lg mb-1 group-hover:text-amber-700 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs sm:text-sm leading-relaxed">
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