import { Eye, CheckCircle, XCircle, Calendar } from "lucide-react";

export default function BookingTable({ bookings, onSelectBooking, onUpdateStatus, onOpenSchedule }) {
    return (
        <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-stone-50 dark:bg-[#23060b] border-b border-stone-200 dark:border-amber-500/20 text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-amber-200">
                            <th className="p-4">Ref & Name</th>
                            <th className="p-4">Phone & Gotra</th>
                            <th className="p-4">Preferred Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-amber-500/10 text-xs">
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-stone-400">
                                    No puja bookings found.
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-stone-50/50 dark:hover:bg-[#23060b]/50 transition">
                                    <td className="p-4">
                                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400 block">{booking.referenceCode}</span>
                                        <span className="font-bold text-stone-900 dark:text-cream-100">{booking.name}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="block text-stone-700 dark:text-cream-200">{booking.phone}</span>
                                        <span className="text-[10px] text-stone-400">Gotra: {booking.gotra}</span>
                                    </td>
                                    <td className="p-4 text-stone-600 dark:text-cream-200">
                                        {booking.preferredDate}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            booking.status === 'confirmed' ? 'bg-green-500/10 text-green-600 border border-green-500/20' :
                                            booking.status === 'rejected' ? 'bg-red-500/10 text-red-600 border border-red-500/20' :
                                            booking.status === 'completed' ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' :
                                            'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                                            booking.paymentStatus === 'submitted' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                                            booking.paymentStatus === 'verified' ? 'bg-green-500/10 text-green-600 border border-green-500/20' :
                                            'bg-stone-500/10 text-stone-500'
                                        }`}>
                                            {booking.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                        <button
                                            onClick={() => onSelectBooking(booking)}
                                            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-cream-200 hover:bg-stone-200 transition cursor-pointer"
                                            title="View Details"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                        </button>
                                        
                                        {booking.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => onUpdateStatus(booking.id, 'confirmed')}
                                                    className="p-2 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-600 hover:text-white transition cursor-pointer"
                                                    title="Accept & Confirm"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => onUpdateStatus(booking.id, 'rejected')}
                                                    className="p-2 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
                                                    title="Reject"
                                                >
                                                    <XCircle className="w-3.5 h-3.5" />
                                                </button>
                                            </>
                                        )}

                                        {booking.paymentStatus === 'submitted' && (
                                            <button
                                                onClick={() => onOpenSchedule(booking)}
                                                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition cursor-pointer inline-flex items-center gap-1 text-[11px]"
                                            >
                                                <Calendar className="w-3.5 h-3.5" /> Schedule
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}