export default function TempleTimeForm({ data, onChange }) {
    return (
        <div className="space-y-5">
            <h3 className="text-sm font-bold text-stone-800 dark:text-amber-100 uppercase tracking-wide">Temple Operating Timings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-amber-200/80 mb-1">Opening Time</label>
                    <input
                        type="text"
                        value={data?.openingTime || ""}
                        onChange={(e) => onChange({ ...data, openingTime: e.target.value })}
                        placeholder="e.g. 05:00 AM"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-amber-200/80 mb-1">Closing Time</label>
                    <input
                        type="text"
                        value={data?.closingTime || ""}
                        onChange={(e) => onChange({ ...data, closingTime: e.target.value })}
                        placeholder="e.g. 09:30 PM"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-amber-200/80 mb-1">Status Note</label>
                    <input
                        type="text"
                        value={data?.status || ""}
                        onChange={(e) => onChange({ ...data, status: e.target.value })}
                        placeholder="e.g. Open All Days"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>
            </div>
        </div>
    );
}