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
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold font-heading text-maroon-900 dark:text-amber-400">
                        {t.pageTitle}
                    </h1>
                    <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-cream-200/70">
                        {t.pageSubtitle}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onAddClick}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {activeTab === "events" ? t.btnAddEvent : t.btnAddNotice}
                </button>
            </div>

            <div className="flex border-b border-stone-200 dark:border-amber-500/20">
                <button
                    type="button"
                    onClick={() => setActiveTab("events")}
                    className={`px-6 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === "events"
                        ? "border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400"
                        : "border-transparent text-stone-500 hover:text-stone-800 dark:text-cream-200/60 dark:hover:text-cream-100"
                        }`}
                >
                    {t.tabEvents}
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("notice")}
                    className={`px-6 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === "notice"
                        ? "border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400"
                        : "border-transparent text-stone-500 hover:text-stone-800 dark:text-cream-200/60 dark:hover:text-cream-100"
                        }`}
                >
                    {t.tabNotice}
                </button>
            </div>

            {!isAdding && (
                <div className="max-w-md w-full">
                    <select
                        value={selectedId || ""}
                        onChange={(e) => onSelectChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-amber-500/20 bg-white dark:bg-[#2a080e] text-stone-800 dark:text-cream-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="">
                            {activeTab === "events"
                                ? t.selectEventPlaceholder
                                : t.selectNoticePlaceholder}
                        </option>
                        {Array.isArray(items) && items.map((item) => {
                            const titleText = lang === "bn"
                                ? (item.title_bn || item.titleBn || item.title_en || item.titleEn || "Untitled Event")
                                : (item.title_en || item.titleEn || item.title_bn || item.titleBn || "Untitled Event");

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
    );
}