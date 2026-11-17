import { X, CreditCard } from "lucide-react";

export default function BookingDetailsModal({ isOpen, onClose, booking }) {
    if (!isOpen || !booking) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-[#1a0408] border border-amber-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 bg-maroon-900 text-amber-100">
                    <h3 className="font-serif font-bold text-sm">
                        Booking Details: {booking.referenceCode}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 dark:bg-[#23060b] rounded-2xl border border-stone-200 dark:border-amber-500/20">
                        <div>
                            <span className="text-stone-400 block">Applicant Name</span>
                            <span className="font-bold text-stone-800 dark:text-cream-100 text-sm">{booking.name}</span>
                        </div>
                        <div>
                            <span className="text-stone-400 block">Phone Number</span>
                            <span className="font-bold text-stone-800 dark:text-cream-100">{booking.phone}</span>
                        </div>
                        <div>
                            <span className="text-stone-400 block">Email</span>
                            <span className="font-bold text-stone-800 dark:text-cream-100">{booking.email || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-stone-400 block">Gotra</span>
                            <span className="font-bold text-stone-800 dark:text-cream-100">{booking.gotra}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold text-amber-600 dark:text-amber-400">Puja Schedule & Status</h4>
                        <div className="p-3 rounded-xl border border-stone-200 dark:border-amber-500/20 space-y-1">
                            <p><strong>Preferred Date:</strong> {booking.preferredDate}</p>
                            <p><strong>Status:</strong> <span className="capitalize font-bold text-amber-600">{booking.status}</span></p>
                            <p><strong>Note:</strong> {booking.note || 'No notes provided.'}</p>
                        </div>
                    </div>

      
                    <div className="space-y-2">
                        <h4 className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4" /> Payment Details
                        </h4>
                        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-500/20 space-y-2">
                            <p><strong>Payment Status:</strong> <span className="capitalize font-bold">{booking.paymentStatus}</span></p>
                            <p><strong>Method:</strong> {booking.paymentMethod || 'N/A'}</p>
                            <p><strong>Sender No:</strong> {booking.paymentNumber || 'N/A'}</p>
                            <p><strong>Transaction ID (TrxID):</strong> <span className="font-mono font-bold text-amber-700 dark:text-amber-300">{booking.transactionId || 'Not submitted yet'}</span></p>
                        </div>
                    </div>


                    {booking.scheduledDate && (
                        <div className="space-y-2">
                            <h4 className="font-bold text-green-600">Scheduled Puja Time</h4>
                            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                <p><strong>Date:</strong> {booking.scheduledDate}</p>
                                <p><strong>Time:</strong> {booking.scheduledTime}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}