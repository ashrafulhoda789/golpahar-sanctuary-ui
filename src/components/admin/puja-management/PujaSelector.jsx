import { Loader2 } from 'lucide-react';

export default function PujaSelector({ pujas = [], selectedPujaId, onSelect, loading }) {
    return (
        <div className="w-full max-w-sm">
            <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1.5">
                Select Puja to Edit
            </label>
            <div className="relative">
                <select
                    value={selectedPujaId || ''}
                    onChange={(e) => onSelect(e.target.value)}
                    disabled={loading}
                    className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer disabled:opacity-50"
                >
                    <option value="" disabled>-- Select a Puja --</option>
                    {pujas.map((puja) => (
                        <option key={puja.id} value={puja.id}>
                            {puja.title_en} ({puja.title_bn})
                        </option>
                    ))}
                </select>
                {loading && (
                    <div className="absolute right-3.5 top-3">
                        <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                    </div>
                )}
            </div>
        </div>
    );
}