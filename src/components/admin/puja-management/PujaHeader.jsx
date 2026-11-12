import { Plus } from 'lucide-react';

export default function PujaHeader({ onAddClick }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 dark:border-amber-500/20 pb-4">
            <div>
                <h2 className="text-lg font-bold font-heading uppercase tracking-wider text-maroon-900 dark:text-amber-100">
                    Puja Management
                </h2>
                <p className="text-xs text-stone-500 font-sans dark:text-amber-200/60">
                    Manage all temple pujas, pricing, schedules, and availability status.
                </p>
            </div>
            <button
                type="button"
                onClick={onAddClick}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all cursor-pointer shrink-0"
            >
                <Plus className="w-4 h-4" /> Add Puja
            </button>
        </div>
    );
}