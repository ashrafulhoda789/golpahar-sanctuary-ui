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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-100 dark:border-amber-500/15 pb-4">
                <div>
                    <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white mb-2">
                        Routine
                    </span>
                    <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-amber-100">
                        Arthi Schedule Management (Bilingual)
                    </h3>
                </div>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
                >
                    + Add Arthi
                </button>
            </div>

            {data.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 dark:bg-[#23060b] rounded-2xl border border-dashed border-stone-200 dark:border-amber-500/20 text-xs text-stone-500 dark:text-stone-400">
                    No arthi schedules added yet. Click &quot;+ Add Arthi&quot; to add one.
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((item, idx) => {
                        const isEnglishTitlePresent = Boolean(item?.title_en && item.title_en.trim() !== "");
                        const isEnglishDescPresent = Boolean(item?.description_en && item.description_en.trim() !== "");

                        return (
                            <div
                                key={idx}
                                className="bg-stone-50 dark:bg-[#23060b] p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-amber-500/25 space-y-4 shadow-2xs"
                            >
                                <div className="flex justify-between items-center border-b border-stone-200/60 dark:border-amber-500/15 pb-2">
                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                                        Arthi Item #{idx + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(idx)}
                                        className="px-3 py-1 text-xs font-bold rounded-xl bg-red-500/10 hover:bg-red-600 text-red-600 hover:text-white transition cursor-pointer"
                                    >
                                        ✕ Remove
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                            Title (English)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Mangal Aarti"
                                            value={item.title_en || ""}
                                            onChange={(e) => handleChange(idx, "title_en", e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                            Title (বাংলা) {isEnglishTitlePresent && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="text"
                                            required={isEnglishTitlePresent}
                                            placeholder="যেমন: মঙ্গলারতি"
                                            value={item.title_bn || ""}
                                            onChange={(e) => handleChange(idx, "title_bn", e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                            Display Time (e.g. 04:00 AM)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="04:00 AM"
                                            value={item.time || ""}
                                            onChange={(e) => handleChange(idx, "time", e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                                Start (24h)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="04:00"
                                                value={item.start || ""}
                                                onChange={(e) => handleChange(idx, "start", e.target.value)}
                                                className="w-full px-2.5 py-2 text-xs rounded-xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                                End (24h)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="05:00"
                                                value={item.end || ""}
                                                onChange={(e) => handleChange(idx, "end", e.target.value)}
                                                className="w-full px-2.5 py-2 text-xs rounded-xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                                    <div>
                                        <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                            Description (English)
                                        </label>
                                        <textarea
                                            rows={2}
                                            placeholder="Early morning awakening prayers..."
                                            value={item.description_en || ""}
                                            onChange={(e) => handleChange(idx, "description_en", e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                                            Description (বাংলা) {isEnglishDescPresent && <span className="text-red-500">*</span>}
                                        </label>
                                        <textarea
                                            rows={2}
                                            required={isEnglishDescPresent}
                                            placeholder="ভোরবেলার আরতি ও প্রার্থনা..."
                                            value={item.description_bn || ""}
                                            onChange={(e) => handleChange(idx, "description_bn", e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
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