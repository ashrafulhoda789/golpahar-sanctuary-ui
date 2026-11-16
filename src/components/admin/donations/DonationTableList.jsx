import { Fragment } from 'react';
import { DollarSign, Trash2, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import DonationDetailPanel from './DonationDetailPanel';

export default function DonationTableList({
    donations,
    loading,
    selectedDonation,
    onSelectDonation,
    onCloseSelected,
    onDeleteClick,
    statusUpdating,
    onStatusChange,
    actionLoading
}) {
    const todayStr = new Date().toISOString().split('T')[0];

    const getStatusBadge = (status) => {
        if (status === 'verified') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-3 h-3" /> Verified
                </span>
            );
        }
        if (status === 'rejected') {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-600 dark:text-red-400">
                    <XCircle className="w-3 h-3" /> Rejected
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                <Clock className="w-3 h-3" /> Pending
            </span>
        );
    };

    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-4 sm:p-6 border-b border-stone-100 dark:border-amber-500/15 flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-800 dark:text-amber-200">
                    All Donations ({donations.length})
                </h3>
            </div>

            {loading ? (
                <div className="p-12 text-center text-xs text-stone-500 dark:text-stone-400">
                    Loading donations...
                </div>
            ) : donations.length === 0 ? (
                <div className="p-12 text-center space-y-2">
                    <DollarSign className="w-8 h-8 mx-auto text-stone-400" />
                    <p className="text-xs text-stone-500 dark:text-stone-400">No donations found.</p>
                </div>
            ) : (
                <>
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-50 dark:bg-stone-900/50 text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase">
                                    <th className="p-4">Donor Info</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Method & TrxID</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100 dark:divide-amber-500/10 text-xs">
                                {donations.map((item) => {
                                    const isToday = item.createdAt && new Date(item.createdAt).toISOString().split('T')[0] === todayStr;
                                    const isSelected = selectedDonation?.id === item.id;
                                    const shouldHighlight = isToday && item.status !== 'verified';

                                    return (
                                        <tr
                                            key={item.id}
                                            className={`transition cursor-pointer ${isSelected
                                                    ? 'bg-amber-100/60 dark:bg-amber-950/50'
                                                    : shouldHighlight
                                                        ? 'bg-amber-50/80 dark:bg-amber-950/25 font-medium'
                                                        : 'hover:bg-stone-50 dark:hover:bg-stone-900/30'
                                                }`}
                                            onClick={() => onSelectDonation(item)}
                                        >
                                            <td className="p-4 relative">
                                                {shouldHighlight && (
                                                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-600 animate-pulse" title="Today's Unverified Donation" />
                                                )}
                                                <span className="font-bold text-stone-900 dark:text-amber-100 block pl-2">
                                                    {item.name}
                                                </span>
                                                <span className="text-[11px] text-stone-500 dark:text-stone-400 pl-2">
                                                    {item.phone}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                                                ৳ {item.amount}
                                            </td>
                                            <td className="p-4 space-y-0.5">
                                                <span className="block uppercase text-[10px] font-bold text-amber-600 dark:text-amber-400">
                                                    {item.paymentMethod.replace('_', ' ')}
                                                </span>
                                                <span className="font-mono text-[11px] text-stone-600 dark:text-stone-300">
                                                    {item.transactionId}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {getStatusBadge(item.status)}
                                            </td>
                                            <td className="p-4 text-stone-500 dark:text-stone-400 whitespace-nowrap">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    type="button"
                                                    onClick={() => onSelectDonation(item)}
                                                    className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-200 hover:bg-amber-600 hover:text-white transition cursor-pointer"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onDeleteClick(item.id)}
                                                    disabled={actionLoading === item.id}
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="lg:hidden divide-y divide-stone-100 dark:divide-amber-500/10">
                        {donations.map((item) => {
                            const isSelected = selectedDonation?.id === item.id;
                            const isToday = item.createdAt && new Date(item.createdAt).toISOString().split('T')[0] === todayStr;
                            const shouldHighlight = isToday && item.status !== 'verified';

                            return (
                                <Fragment key={item.id}>
                                    <div
                                        onClick={() => (isSelected ? onCloseSelected() : onSelectDonation(item))}
                                        className={`p-4 space-y-2.5 transition cursor-pointer relative ${isSelected
                                                ? 'bg-amber-100/60 dark:bg-amber-950/50'
                                                : shouldHighlight
                                                    ? 'bg-amber-50/80 dark:bg-amber-950/30 border-l-4 border-amber-600'
                                                    : 'hover:bg-stone-50 dark:hover:bg-stone-900/30'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h4 className="text-xs font-bold text-stone-900 dark:text-amber-100 flex items-center gap-1.5">
                                                    {shouldHighlight && <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />}
                                                    {item.name}
                                                </h4>
                                                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                                                    {item.phone}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(item.status)}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDeleteClick(item.id);
                                                    }}
                                                    disabled={actionLoading === item.id}
                                                    className="p-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs pt-1">
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                                ৳ {item.amount}
                                            </span>
                                            <span className="uppercase text-[10px] font-bold text-amber-600 dark:text-amber-400">
                                                {item.paymentMethod.replace('_', ' ')}
                                            </span>
                                        </div>

                                        <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                                            TrxID: {item.transactionId}
                                        </div>
                                    </div>

                                    {isSelected && (
                                        <DonationDetailPanel
                                            donation={selectedDonation}
                                            statusUpdating={statusUpdating}
                                            onStatusChange={onStatusChange}
                                            onDeleteClick={onDeleteClick}
                                            onClose={onCloseSelected}
                                            isMobile={true}
                                        />
                                    )}
                                </Fragment>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}