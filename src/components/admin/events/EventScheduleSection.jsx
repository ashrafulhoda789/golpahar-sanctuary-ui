import { Plus, Trash2, Calendar, Clock, Sparkles } from "lucide-react";

export default function EventScheduleSection({
    schedules,
    onAddSchedule,
    onScheduleChange,
    onRemoveSchedule,
    inputClass,
    labelClass,
    t = {},
    lang = "en",
}) {
    const isBn = lang === "bn";

    const handleAddActivity = (scheduleIndex) => {
        const updatedSchedules = [...schedules];
        if (!updatedSchedules[scheduleIndex].activities) {
            updatedSchedules[scheduleIndex].activities = [];
        }
        updatedSchedules[scheduleIndex].activities.push({
            time: "",
            name_en: "",
            name_bn: ""
        });
        onScheduleChange(scheduleIndex, "activities", updatedSchedules[scheduleIndex].activities);
    };

    const handleActivityChange = (scheduleIndex, activityIndex, field, value) => {
        const updatedSchedules = [...schedules];
        const activities = [...updatedSchedules[scheduleIndex].activities];
        activities[activityIndex] = {
            ...activities[activityIndex],
            [field]: value
        };
        updatedSchedules[scheduleIndex].activities = activities;
        onScheduleChange(scheduleIndex, "activities", updatedSchedules[scheduleIndex].activities);
    };

    const handleRemoveActivity = (scheduleIndex, activityIndex) => {
        const updatedSchedules = [...schedules];
        updatedSchedules[scheduleIndex].activities = updatedSchedules[scheduleIndex].activities.filter((_, i) => i !== activityIndex);
        onScheduleChange(scheduleIndex, "activities", updatedSchedules[scheduleIndex].activities);
    };

    return (
        <div className="border-t border-stone-200 dark:border-amber-500/20 pt-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-sm font-bold text-maroon-900 dark:text-amber-400 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {t.schedulesTitle || "Day-wise Schedules & Programs"}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-cream-200/60">
                        {t.schedulesSubtitle || "Add specific dates, time slots, and activities for each day."}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onAddSchedule}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5" /> {t.addSchedule || "Add Day Schedule"}
                    </button>
                </div>
            </div>

            {schedules.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-stone-300 dark:border-amber-500/20 rounded-lg text-xs text-stone-400">
                    {t.noSchedules || "No day schedules added yet. Click 'Add Day Schedule' to begin."}
                </div>
            ) : (
                <div className="space-y-6">
                    {schedules.map((sch, index) => (
                        <div
                            key={index}
                            className="bg-stone-50 dark:bg-[#1a0509]/80 border border-stone-200 dark:border-amber-500/20 rounded-xl p-4 sm:p-5 space-y-4 relative shadow-sm"
                        >
                            <div className="flex items-center justify-between border-b border-stone-200 dark:border-amber-500/10 pb-2">
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" /> {isBn ? `তফসিল #${index + 1}` : `Schedule #${index + 1}`}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onRemoveSchedule(index)}
                                    className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> {t.remove || "Remove"}
                                </button>
                            </div>

                           
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>
                                        {isBn ? "দিনের লেবেল (ইংরেজি) *" : "Day Label (EN) *"}
                                    </label>
                                    <input
                                        type="text"
                                        value={sch.day_label_en || ""}
                                        onChange={(e) => onScheduleChange(index, "day_label_en", e.target.value)}
                                        placeholder="e.g. Day 1"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        {isBn ? "দিনের লেবেল (বাংলা) *" : "Day Label (BN) *"}
                                    </label>
                                    <input
                                        type="text"
                                        value={sch.day_label_bn || ""}
                                        onChange={(e) => onScheduleChange(index, "day_label_bn", e.target.value)}
                                        placeholder="যেমন: প্রথম দিন"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                           
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className={labelClass}>
                                        {isBn ? "তারিখ (Schedule Date) *" : "Schedule Date *"}
                                    </label>
                                    <input
                                        type="date"
                                        value={sch.schedule_date || ""}
                                        onChange={(e) => onScheduleChange(index, "schedule_date", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

       
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>
                                        {isBn ? "দিনের শিরোনাম / থিম (ইংরেজি)" : "Day Title / Theme (EN)"}
                                    </label>
                                    <input
                                        type="text"
                                        value={sch.day_title_en || ""}
                                        onChange={(e) => onScheduleChange(index, "day_title_en", e.target.value)}
                                        placeholder="Inauguration & Cultural Eve"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        {isBn ? "দিনের শিরোনাম / থিম (বাংলা)" : "Day Title / Theme (BN)"}
                                    </label>
                                    <input
                                        type="text"
                                        value={sch.day_title_bn || ""}
                                        onChange={(e) => onScheduleChange(index, "day_title_bn", e.target.value)}
                                        placeholder="উদ্বোধন ও সাংস্কৃতিক সন্ধ্যা"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                           
                            <div className="border-t border-stone-200 dark:border-amber-500/10 pt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-stone-700 dark:text-amber-300 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                        {isBn ? "কার্যক্রম বা সাব-ইভেন্টসমূহ (Activities)" : "Programme Activities"}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => handleAddActivity(index)}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-maroon-900 text-amber-300 hover:bg-maroon-800 dark:bg-amber-600 dark:text-white text-[11px] font-semibold transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-3 h-3" /> {isBn ? "অ্যাক্টিভিটি যোগ করুন" : "Add Activity"}
                                    </button>
                                </div>

                                {(!sch.activities || sch.activities.length === 0) ? (
                                    <div className="text-center py-4 border border-dashed border-stone-200 dark:border-amber-500/15 rounded-lg text-[11px] text-stone-400">
                                        {isBn ? "কোনো অ্যাক্টিভিটি যোগ করা হয়নি। উপরে 'অ্যাক্টিভিটি যোগ করুন' এ ক্লিক করুন।" : "No activities added yet. Click 'Add Activity' above."}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {sch.activities.map((act, actIndex) => (
                                            <div
                                                key={actIndex}
                                                className="bg-white dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/20 p-3.5 rounded-xl space-y-3 relative shadow-xs"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                                                        {isBn ? `অ্যাক্টিভিটি #${actIndex + 1}` : `Activity #${actIndex + 1}`}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveActivity(index, actIndex)}
                                                        className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3 h-3" /> {isBn ? "মুছুন" : "Delete"}
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    
                                                    <div>
                                                        <label className="block text-[11px] font-medium text-stone-500 dark:text-cream-200/70 mb-1">
                                                            {isBn ? "সময় নির্বাচন করুন (Time) *" : "Select Time *"}
                                                        </label>
                                                        <input
                                                            type="time"
                                                            value={act.time || ""}
                                                            onChange={(e) => handleActivityChange(index, actIndex, "time", e.target.value)}
                                                            className={inputClass}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[11px] font-medium text-stone-500 dark:text-cream-200/70 mb-1">
                                                            {isBn ? "নাম (ইংরেজি) *" : "Activity Name [EN] *"}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={act.name_en || ""}
                                                            onChange={(e) => handleActivityChange(index, actIndex, "name_en", e.target.value)}
                                                            placeholder="Opening Ceremony"
                                                            className={inputClass}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[11px] font-medium text-stone-500 dark:text-cream-200/70 mb-1">
                                                            {isBn ? "নাম (বাংলা) *" : "Activity Name [BN] *"}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={act.name_bn || ""}
                                                            onChange={(e) => handleActivityChange(index, actIndex, "name_bn", e.target.value)}
                                                            placeholder="উদ্বোধনী অনুষ্ঠান"
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}