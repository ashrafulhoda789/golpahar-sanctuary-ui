/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Loader2, RefreshCw, AlertTriangle, X } from "lucide-react";
import { fetchAllBookings } from "../../lib/api/bookings";
import { scheduleBookingPuja, updateBookingStatus } from "../../lib/actions/bookings";
import BookingStats from "../../components/admin/bookings/BookingStats";
import BookingTable from "../../components/admin/bookings/BookingTable";
import BookingDetailsModal from "../../components/admin/bookings/BookingDetailsModal";
import ScheduleModal from "../../components/admin/bookings/ScheduleModal";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionError, setActionError] = useState(""); 

    // Modal States
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [bookingToReject, setBookingToReject] = useState(null);

    const loadBookings = async () => {
        setLoading(true);
        setError("");
        setActionError("");
        try {
            const res = await fetchAllBookings();
            if (res.success) {
                setBookings(res.data);
            } else {
                setError(res.message || "Failed to load bookings");
            }
        } catch (err) {
            setError("Network error while loading bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        if (status === 'rejected') {
            setBookingToReject(id);
            setIsConfirmOpen(true);
            return;
        }

        executeStatusUpdate(id, status);
    };

    const executeStatusUpdate = async (id, status) => {
        setActionError("");
        try {
            const res = await updateBookingStatus(id, { status });
            if (res.success) {
               
                setBookings((prevBookings) =>
                    prevBookings.map((b) =>
                        b.id === id ? { ...b, status: res.data.status, whatsappUrl: res.data.whatsappUrl } : b
                    )
                );
                loadBookings(); 
            } else {
                setActionError(res.message || "Failed to update status");
            }
        } catch (err) {
            setActionError("Error updating status");
        }
    };

    const confirmReject = () => {
        if (bookingToReject) {
            executeStatusUpdate(bookingToReject, 'rejected');
        }
        setIsConfirmOpen(false);
        setBookingToReject(null);
    };

    const handleScheduleSubmit = async (id, scheduleData) => {
        setActionError("");
        try {
            const res = await scheduleBookingPuja(id, scheduleData);
            if (res.success) {
                loadBookings();
            } else {
                setActionError(res.message || "Failed to schedule puja");
            }
        } catch (err) {
            setActionError("Error scheduling puja");
        }
    };

    return (
        <div className="space-y-8 p-6 ">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
                        Puja Bookings Management
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
                        Review devotee requests, verify payments, and schedule pujas.
                    </p>
                </div>
                <button
                    onClick={loadBookings}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                </button>
            </div>

            {actionError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-2xl flex items-center justify-between">
                    <span>{actionError}</span>
                    <button onClick={() => setActionError("")} className="font-bold hover:opacity-75">✕</button>
                </div>
            )}

            <BookingStats bookings={bookings} />

            {loading ? (
                <div className="text-center py-20 text-stone-400 flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Loading bookings...
                </div>
            ) : error ? (
                <div className="p-4 bg-red-500/10 text-red-500 text-xs rounded-2xl text-center">
                    {error}
                </div>
            ) : (
                <BookingTable
                    bookings={bookings}
                    onSelectBooking={(b) => { setSelectedBooking(b); setIsDetailsOpen(true); }}
                    onUpdateStatus={handleUpdateStatus}
                    onOpenSchedule={(b) => { setSelectedBooking(b); setIsScheduleOpen(true); }}
                />
            )}

            {/* Modals */}
            <BookingDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                booking={selectedBooking}
            />

            <ScheduleModal
                isOpen={isScheduleOpen}
                onClose={() => setIsScheduleOpen(false)}
                booking={selectedBooking}
                onScheduleSubmit={handleScheduleSubmit}
            />

            {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="bg-white dark:bg-[#1a0408] border border-red-500/30 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 space-y-4 text-center">
                        <div className="w-12 h-12 bg-red-500/10 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                                Are you sure?
                            </h3>
                            <p className="text-xs text-stone-500 dark:text-cream-200/70">
                                Do you really want to reject this booking? This action cannot be easily undone.
                            </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => setIsConfirmOpen(false)}
                                className="flex-1 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-cream-200 text-xs font-bold transition hover:bg-stone-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReject}
                                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer shadow-sm"
                            >
                                Yes, Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}