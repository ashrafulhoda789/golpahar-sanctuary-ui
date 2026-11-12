export default function ArthiScheduleForm({ data = [], onChange }) {
    const handleAdd = () => {
        onChange([
            ...data,
            {
                title_en: "",
                title_bn: "",
                description_en: "",
                description_bn: "",
                time: "",
                start: "",
                end: ""
            }
        ]);
    };

    const handleRemove = (index) => {
        const list = data.filter((_, i) => i !== index);
        onChange(list);
    };

    const handleChange = (index, field, value) => {
        const list = [...data];
        list[index] = { ...list[index], [field]: value };
        onChange(list);
    };

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-stone-800 dark:text-amber-100 uppercase tracking-wide">
                    Arthi Schedule Management (Bilingual)
                </h3>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-3.5 py-1.5 bg-[#5c060c] dark:bg-amber-500 text-white dark:text-[#23060b] text-xs font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                    + Add Arthi
                </button>
            </div>

            {data.length === 0 ? (
                <p className="text-xs italic text-stone-500 dark:text-amber-200/50">
                    No arthi schedules added yet. Click "+ Add Arthi" to add one.
                </p>
            ) : (
                <div className="space-y-4">
                    {data.map((item, idx) => {
                        const isEnglishTitlePresent = Boolean(item?.title_en && item.title_en.trim() !== "");
                        const isEnglishDescPresent = Boolean(item?.description_en && item.description_en.trim() !== "");

                        return (
                            <div
                                key={idx}
                                className="bg-stone-50 dark:bg-[#1f0509] p-4 rounded-xl border border-stone-200 dark:border-amber-500/30 space-y-3 relative shadow-sm"
                            >
                                <div className="flex justify-between items-center border-b border-stone-200 dark:border-amber-500/20 pb-2">
                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-300">
                                        Arthi Item #{idx + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(idx)}
                                        className="text-rose-600 hover:text-rose-800 text-xs font-bold px-2 py-1 bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                                    >
                                        ✕ Remove
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

                                    <div>
                                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                                            Title (English)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Mangal Aarti"
                                            value={item.title_en || ""}
                                            onChange={(e) => handleChange(idx, "title_en", e.target.value)}
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                                            Title (বাংলা) {isEnglishTitlePresent && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="text"
                                            required={isEnglishTitlePresent}
                                            placeholder="যেমন: মঙ্গলারতি"
                                            value={item.title_bn || ""}
                                            onChange={(e) => handleChange(idx, "title_bn", e.target.value)}
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                                            Display Time (e.g. 04:00 AM)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="04:00 AM"
                                            value={item.time || ""}
                                            onChange={(e) => handleChange(idx, "time", e.target.value)}
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                                                Start (24h)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="04:00"
                                                value={item.start || ""}
                                                onChange={(e) => handleChange(idx, "start", e.target.value)}
                                                className="w-full px-2 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                                                End (24h)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="05:00"
                                                value={item.end || ""}
                                                onChange={(e) => handleChange(idx, "end", e.target.value)}
                                                className="w-full px-2 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                                    <div>
                                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                                            Description (English)
                                        </label>
                                        <textarea
                                            rows={2}
                                            placeholder="Early morning awakening prayers..."
                                            value={item.description_en || ""}
                                            onChange={(e) => handleChange(idx, "description_en", e.target.value)}
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                                            Description (বাংলা) {isEnglishDescPresent && <span className="text-red-500">*</span>}
                                        </label>
                                        <textarea
                                            rows={2}
                                            required={isEnglishDescPresent}
                                            placeholder="ভোরবেলার আরতি ও প্রার্থনা..."
                                            value={item.description_bn || ""}
                                            onChange={(e) => handleChange(idx, "description_bn", e.target.value)}
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}