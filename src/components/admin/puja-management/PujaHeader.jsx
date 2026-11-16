import { Plus } from 'lucide-react';

export default function PujaHeader({ onAddClick }) {
    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-heading font-bold text-stone-900 dark:text-amber-100">
                    Puja Management
                </h1>
                <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
                    Manage all temple pujas, pricing, schedules, and availability status.
                </p>
            </div>
            <button
                type="button"
                onClick={onAddClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer shrink-0"
            >
                <Plus className="w-4 h-4" /> Add Puja
            </button>
        </div>
    );
}