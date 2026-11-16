import { Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function DonationDetailPanel({
    donation,
    statusUpdating,
    onStatusChange,
    onDeleteClick,
    onClose,
    isMobile = false
}) {
    if (!donation) return null;

    return (
        <div
            className={`${isMobile
                    ? 'bg-amber-50/40 dark:bg-[#23060b] border-t border-amber-500/25 p-4 space-y-4'
                    : 'bg-white dark:bg-[#1a0408] border-2 border-amber-500/40 rounded-3xl p-6 shadow-xl sticky top-6 space-y-4'
                }`}
        >
            <div className="flex items-center justify-between border-b border-stone-200/70 dark:border-amber-500/15 pb-3">
                <h3 className="text-sm sm:text-base font-bold font-serif text-stone-900 dark:text-amber-100">
                    Donation Details
                </h3>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-amber-200 cursor-pointer font-bold"
                >
                    Close ✕
                </button>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Donor Name</span>
                        <p className="text-sm font-bold text-stone-800 dark:text-amber-100">{donation.name}</p>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Phone</span>
                        <p className="text-xs text-stone-700 dark:text-cream-200">{donation.phone}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Amount</span>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">৳ {donation.amount}</p>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Method</span>
                        <p className="text-xs uppercase font-bold text-stone-700 dark:text-cream-200">{donation.paymentMethod.replace('_', ' ')}</p>
                    </div>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Transaction ID</span>
                    <p className="text-xs font-mono font-bold bg-stone-100 dark:bg-stone-900 p-2 rounded-xl text-stone-800 dark:text-amber-200">
                        {donation.transactionId}
                    </p>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Date</span>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                        {new Date(donation.createdAt).toLocaleString()}
                    </p>
                </div>

                <div className="pt-2 space-y-2 border-t border-stone-200/70 dark:border-amber-500/15">
                    <span className="block text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                        Update Status
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            disabled={statusUpdating === donation.id}
                            onClick={() => onStatusChange(donation.id, 'verified')}
                            className={`px-3 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${donation.status === 'verified'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                                }`}
                        >
                            <CheckCircle className="w-3.5 h-3.5" /> Verify
                        </button>
                        <button
                            type="button"
                            disabled={statusUpdating === donation.id}
                            onClick={() => onStatusChange(donation.id, 'pending')}
                            className={`px-3 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${donation.status === 'pending'
                                    ? 'bg-amber-600 text-white shadow-sm'
                                    : 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20'
                                }`}
                        >
                            <Clock className="w-3.5 h-3.5" /> Pending
                        </button>
                        <button
                            type="button"
                            disabled={statusUpdating === donation.id}
                            onClick={() => onStatusChange(donation.id, 'rejected')}
                            className={`px-3 py-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer ${donation.status === 'rejected'
                                    ? 'bg-red-600 text-white shadow-sm'
                                    : 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
                                }`}
                        >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="button"
                        onClick={() => onDeleteClick(donation.id)}
                        className="px-4 py-2 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Donation
                    </button>
                </div>
            </div>
        </div>
    );
}