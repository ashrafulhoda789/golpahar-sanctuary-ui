import { Plus } from "lucide-react";

export default function EventsNoticesHeader({
    t,
    activeTab,
    setActiveTab,
    isAdding,
    onAddClick,
    items = [],
    selectedId,
    onSelectChange,
    lang,
}) {
    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-stone-900 dark:text-amber-100">
                        {t.pageTitle}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
                        {t.pageSubtitle}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onAddClick}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    {activeTab === "events" ? t.btnAddEvent : t.btnAddNotice}
                </button>
            </div>

            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-2 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab("events")}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === "events"
                                ? "bg-amber-600 text-white shadow-xs"
                                : "text-stone-600 dark:text-cream-200 hover:bg-stone-50 dark:hover:bg-[#23060b]"
                            }`}
                    >
                        {t.tabEvents}
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("notice")}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === "notice"
                                ? "bg-amber-600 text-white shadow-xs"
                                : "text-stone-600 dark:text-cream-200 hover:bg-stone-50 dark:hover:bg-[#23060b]"
                            }`}
                    >
                        {t.tabNotice}
                    </button>
                </div>

                {!isAdding && (
                    <div className="w-full sm:w-72">
                        <select
                            value={selectedId || ""}
                            onChange={(e) => onSelectChange(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                        >
                            <option value="" disabled>
                                {activeTab === "events"
                                    ? t.selectEventPlaceholder
                                    : t.selectNoticePlaceholder}
                            </option>
                            {Array.isArray(items) && items.map((item) => {
                                const titleText = lang === "bn"
                                    ? (item.title_bn || item.titleBn || item.title_en || item.titleEn || "Untitled")
                                    : (item.title_en || item.titleEn || item.title_bn || item.titleBn || "Untitled");

                                return (
                                    <option key={item.id} value={item.id}>
                                        {titleText}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
}