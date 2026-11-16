import { AlertTriangle } from 'lucide-react';

export default function DeleteDonationModal({ isOpen, onClose, onConfirm, isDeleting }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 text-red-600">
                    <div className="p-3 rounded-2xl bg-red-500/10">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold font-serif text-stone-900 dark:text-amber-100">
                            Delete Donation Record
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                            Are you sure you want to delete this donation record?
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-cream-200 text-xs font-bold transition cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}