import { useState } from "react";
import { X, Loader2 } from "lucide-react";

export default function ScheduleModal({ isOpen, onClose, booking, onScheduleSubmit }) {
    const [scheduleData, setScheduleData] = useState({
        scheduledDate: booking?.preferredDate || "",
        scheduledTime: "10:00 AM",
        adminNote: ""
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen || !booking) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onScheduleSubmit(booking.id, scheduleData);
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-[#1a0408] border border-amber-500/30 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 bg-maroon-900 text-amber-100">
                    <h3 className="font-serif font-bold text-sm">
                        Schedule Puja for {booking.name}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                    <div className="p-3 bg-stone-50 dark:bg-[#23060b] rounded-xl border border-stone-200 dark:border-amber-500/20">
                        <p className="text-stone-500">TrxID: <strong className="font-mono text-amber-600">{booking.transactionId}</strong></p>
                    </div>

                    <div>
                        <label className="block font-bold text-stone-700 dark:text-amber-200 mb-1">Scheduled Date *</label>
                        <input
                            type="date"
                            required
                            value={scheduleData.scheduledDate}
                            onChange={(e) => setScheduleData({ ...scheduleData, scheduledDate: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-stone-700 dark:text-amber-200 mb-1">Scheduled Time *</label>
                        <input
                            type="text"
                            required
                            value={scheduleData.scheduledTime}
                            onChange={(e) => setScheduleData({ ...scheduleData, scheduledTime: e.target.value })}
                            placeholder="e.g. 10:30 AM"
                            className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-stone-700 dark:text-amber-200 mb-1">Admin Note / Instructions</label>
                        <textarea
                            rows={3}
                            value={scheduleData.adminNote}
                            onChange={(e) => setScheduleData({ ...scheduleData, adminNote: e.target.value })}
                            placeholder="Instructions for devotee..."
                            className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        <span>Confirm & Schedule Puja</span>
                    </button>
                </form>
            </div>
        </div>
    );
}