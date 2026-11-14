import { useState, useEffect } from "react";
import { Calendar, MapPin, Timer, Sparkles, Clock } from "lucide-react";

export default function UpcomingEventCard({ event, lang = "en" }) {
    const isBn = lang === "bn";

    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!event) return;
        const eventDateTime = event.eventDateTime || event.event_date_time;
        if (!eventDateTime) return;

        const targetDate = new Date(eventDateTime).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [event]);

    if (!event) return null;

    const title = isBn ? event.titleBn || event.title_bn : event.titleEn || event.title_en;
    const description = isBn ? event.descriptionBn || event.description_bn : event.descriptionEn || event.description_en;
    const location = isBn ? event.locationBn || event.location_bn : event.locationEn || event.location_en;

    const schedules = event.schedules || [];
    const activeSchedule = schedules[activeDayIndex];

    return (
        <div className="space-y-8">

            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl shadow-sm overflow-hidden p-6 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white">
                                <Sparkles className="w-3.5 h-3.5" />
                                {isBn ? event.categoryBn || event.category_en || "আসন্ন উৎসব" : event.categoryEn || event.category_en || "Upcoming Festival"}
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#7c1d1d] dark:text-amber-100">
                            {title}
                        </h2>

                        <p className="text-xs sm:text-sm text-stone-600 dark:text-cream-200/80 leading-relaxed">
                            {description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-cream-200/60 pt-2">
                            <div className="flex items-center gap-1.5 font-medium">
                                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                <span>{new Date(event.eventDateTime || event.event_date_time).toLocaleString(isBn ? 'bn-BD' : 'en-US', { dateStyle: 'full', timeStyle: 'short' })}</span>
                            </div>
                            {location && (
                                <div className="flex items-center gap-1.5 font-medium">
                                    <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                    <span>{location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center items-center bg-amber-50/40 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/20 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 mb-4 uppercase tracking-wider">
                            <Timer className="w-4 h-4" />
                            <span>{isBn ? "মহোৎসব শুরু হতে বাকি" : "Countdown to Festival"}</span>
                        </div>

                        <div className="grid grid-cols-4 gap-3 text-center w-full">
                            <div className="bg-white dark:bg-[#1a0408] p-3 rounded-xl border border-stone-200 dark:border-amber-500/20 shadow-sm">
                                <span className="block text-lg sm:text-2xl font-serif font-bold text-maroon-900 dark:text-amber-300">{timeLeft.days}</span>
                                <span className="text-[10px] font-bold text-stone-500 dark:text-cream-200/60 uppercase">{isBn ? "দিন" : "Days"}</span>
                            </div>
                            <div className="bg-white dark:bg-[#1a0408] p-3 rounded-xl border border-stone-200 dark:border-amber-500/20 shadow-sm">
                                <span className="block text-lg sm:text-2xl font-serif font-bold text-maroon-900 dark:text-amber-300">{timeLeft.hours}</span>
                                <span className="text-[10px] font-bold text-stone-500 dark:text-cream-200/60 uppercase">{isBn ? "ঘণ্টা" : "Hours"}</span>
                            </div>
                            <div className="bg-white dark:bg-[#1a0408] p-3 rounded-xl border border-stone-200 dark:border-amber-500/20 shadow-sm">
                                <span className="block text-lg sm:text-2xl font-serif font-bold text-maroon-900 dark:text-amber-300">{timeLeft.minutes}</span>
                                <span className="text-[10px] font-bold text-stone-500 dark:text-cream-200/60 uppercase">{isBn ? "মিনিট" : "Mins"}</span>
                            </div>
                            <div className="bg-white dark:bg-[#1a0508] p-3 rounded-xl border border-stone-200 dark:border-amber-500/20 shadow-sm">
                                <span className="block text-lg sm:text-2xl font-serif font-bold text-maroon-900 dark:text-amber-300">{timeLeft.seconds}</span>
                                <span className="text-[10px] font-bold text-stone-500 dark:text-cream-200/60 uppercase">{isBn ? "সেকেন্ড" : "Secs"}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {schedules.length > 0 && (
                <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl shadow-sm overflow-hidden p-6 sm:p-10 space-y-6">

                    <div className="border-b border-stone-200 dark:border-amber-500/15 pb-4 flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-xl font-serif font-bold text-maroon-900 dark:text-amber-300 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-amber-600" />
                            {isBn ? "দিনভিত্তিক সূচি ও কার্যক্রম" : "Schedules & Activities"}
                        </h3>

                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {schedules.map((sch, index) => {
                                const dayLabel = isBn ? sch.dayLabelBn || sch.day_label_bn : sch.dayLabelEn || sch.day_label_en;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setActiveDayIndex(index)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${activeDayIndex === index
                                                ? "bg-maroon-900 text-amber-300 dark:bg-amber-600 dark:text-white shadow-md"
                                                : "bg-stone-100 hover:bg-stone-200 dark:bg-[#23060b] dark:text-cream-200/70 border border-stone-200 dark:border-amber-500/20"
                                            }`}
                                    >
                                        {dayLabel || `Day ${index + 1}`} {sch.scheduleDate || sch.schedule_date ? `(${sch.scheduleDate || sch.schedule_date})` : ""}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {activeSchedule && (
                        <div className="bg-amber-50/20 dark:bg-[#23060b]/50 border border-stone-200 dark:border-amber-500/25 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">

                            <div className="flex flex-wrap items-center justify-between border-b border-stone-200 dark:border-amber-500/20 pb-4 gap-2">
                                <div>
                                    <h4 className="text-lg sm:text-xl font-serif font-bold text-[#7c1d1d] dark:text-amber-200">
                                        {isBn ? activeSchedule.dayTitleBn || activeSchedule.day_title_bn : activeSchedule.dayTitleEn || activeSchedule.day_title_en}
                                    </h4>
                                    {(activeSchedule.scheduleDate || activeSchedule.schedule_date) && (
                                        <p className="text-xs text-stone-500 dark:text-cream-200/60 flex items-center gap-1.5 mt-1 font-medium">
                                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                                            {activeSchedule.scheduleDate || activeSchedule.schedule_date}
                                        </p>
                                    )}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-amber-500/20">
                                    {isBn ? "কার্যক্রম ও সময়সূচি" : "Programme Moments"}
                                </span>
                            </div>

                            <div className="divide-y divide-stone-200 dark:divide-amber-500/15">
                                {(() => {
                                    let activitiesList = [];
                                    try {
                                        if (typeof activeSchedule.activities === "string") {
                                            activitiesList = JSON.parse(activeSchedule.activities);
                                        } else if (Array.isArray(activeSchedule.activities)) {
                                            activitiesList = activeSchedule.activities;
                                        }
                                    // eslint-disable-next-line no-unused-vars
                                    } catch (e) {
                                        activitiesList = [];
                                    }

                                    if (activitiesList.length === 0) {
                                        return (
                                            <div className="py-6 text-center text-xs text-stone-500 dark:text-cream-200/60">
                                                {isBn ? "কোনো কার্যক্রম যুক্ত করা হয়নি।" : "No activities added yet."}
                                            </div>
                                        );
                                    }

                                    return activitiesList.map((act, idx) => {
                                        const actTime = act.time || "";
                                        const actName = isBn ? act.name_bn || act.name_en : act.name_en || act.name_bn;

                                        return (
                                            <div key={idx} className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                                <div className="md:col-span-3 flex items-center gap-1.5 text-xs font-mono font-bold text-stone-600 dark:text-amber-300/90">
                                                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                                                    <span>{actTime || (isBn ? "সময় নির্ধারিত নয়" : "Scheduled")}</span>
                                                </div>

                                                <div className="md:col-span-9 space-y-1">
                                                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-cream-200/50">
                                                        {isBn ? "অনুষ্ঠান / ইভেন্ট" : "EVENT"}
                                                    </span>
                                                    <h5 className="text-sm sm:text-base font-bold text-stone-800 dark:text-cream-100">
                                                        {actName}
                                                    </h5>
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
}