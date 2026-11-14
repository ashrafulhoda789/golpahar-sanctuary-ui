/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Loader2, AlertTriangle, X } from "lucide-react";
import { translations } from "../../locales/translations";
import { useLanguage } from "../../context/LanguageContext";
import { getAllEvents } from "../../lib/api/events";
import { createEvent, updateEvent, deleteEvent } from "../../lib/actions/events";
import { getAllNotices } from "../../lib/api/notices";
import { createNotice, updateNotice, deleteNotice } from "../../lib/actions/notices";
import EventsNoticesHeader from "../../components/admin/events/EventsNoticesHeader";
import EventForm from "../../components/admin/events/EventForm";
import NoticeForm from "../../components/admin/events/NoticeForm";

export default function EventsNoticesManagementPage() {
    const { lang } = useLanguage();
    const t =
        translations[lang]?.adminEventsNotices ||
        translations.en.adminEventsNotices;

    const [activeTab, setActiveTab] = useState("events"); 
    const [isAdding, setIsAdding] = useState(false);

    const [eventsList, setEventsList] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [noticesList, setNoticesList] = useState([]);
    const [selectedNoticeId, setSelectedNoticeId] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showFeedback = (type, message) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback({ type: "", message: "" }), 4000);
    };

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        const json = await getAllEvents();
        if (json.success && Array.isArray(json.data)) {
            setEventsList(json.data);
            if (json.data.length > 0 && !selectedEventId) {
                setSelectedEventId(json.data[0].id);
            }
        }
        setLoading(false);
    }, [selectedEventId]);

    const fetchNotices = useCallback(async () => {
        setLoading(true);
        const json = await getAllNotices();
        if (json.success && Array.isArray(json.data)) {
            setNoticesList(json.data);
            if (json.data.length > 0 && !selectedNoticeId) {
                setSelectedNoticeId(json.data[0].id);
            }
        }
        setLoading(false);
    }, [selectedNoticeId]);

    useEffect(() => {
        if (activeTab === "events") {
            fetchEvents();
        } else {
            fetchNotices();
        }
    }, [activeTab, fetchEvents, fetchNotices]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsAdding(false);
        setFeedback({ type: "", message: "" });
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setFeedback({ type: "", message: "" });
    };

    const handleCreateEvent = async (formData) => {
        setSubmitting(true);
        const json = await createEvent(formData);
        if (json.success) {
            showFeedback("success", json.message || "Event created!");
            setIsAdding(false);
            await fetchEvents();
            if (json.data?.id) setSelectedEventId(json.data.id);
        } else {
            showFeedback("error", json.message || "Failed to create event");
        }
        setSubmitting(false);
    };

    const handleUpdateEvent = async (formData) => {
        if (!selectedEventId) return;
        setSubmitting(true);
        const json = await updateEvent(selectedEventId, formData);
        if (json.success) {
            showFeedback("success", json.message || "Event updated!");
            await fetchEvents();
        } else {
            showFeedback("error", json.message || "Failed to update event");
        }
        setSubmitting(false);
    };

    const confirmDeleteEvent = () => {
        if (!selectedEventId) return;
        setShowDeleteModal(true);
    };

    const executeDeleteEvent = async () => {
        setShowDeleteModal(false);
        setSubmitting(true);
        const json = await deleteEvent(selectedEventId);
        if (json.success) {
            showFeedback("success", json.message || "Event deleted!");
            setSelectedEventId("");
            await fetchEvents();
        } else {
            showFeedback("error", json.message || "Failed to delete event");
        }
        setSubmitting(false);
    };

    // Notice Handlers
    const handleCreateNotice = async (formData) => {
        setSubmitting(true);
        const json = await createNotice(formData);
        if (json.success) {
            showFeedback("success", json.message || "Notice published!");
            setIsAdding(false);
            await fetchNotices();
            if (json.data?.id) setSelectedNoticeId(json.data.id);
        } else {
            showFeedback("error", json.message || "Failed to publish notice");
        }
        setSubmitting(false);
    };

    const handleUpdateNotice = async (formData) => {
        if (!selectedNoticeId) return;
        setSubmitting(true);
        const json = await updateNotice(selectedNoticeId, formData);
        if (json.success) {
            showFeedback("success", json.message || "Notice updated!");
            await fetchNotices();
        } else {
            showFeedback("error", json.message || "Failed to update notice");
        }
        setSubmitting(false);
    };

    // Trigger Notice Delete Modal
    const confirmDeleteNotice = () => {
        if (!selectedNoticeId) return;
        setShowDeleteModal(true);
    };

    const executeDeleteNotice = async () => {
        setShowDeleteModal(false);
        setSubmitting(true);
        const json = await deleteNotice(selectedNoticeId);
        if (json.success) {
            showFeedback("success", json.message || "Notice deleted!");
            setSelectedNoticeId("");
            await fetchNotices();
        } else {
            showFeedback("error", json.message || "Failed to delete notice");
        }
        setSubmitting(false);
    };

    const selectedEvent = eventsList.find((ev) => ev.id === selectedEventId);
    const selectedNotice = noticesList.find((n) => n.id === selectedNoticeId);

    return (
        <div className="p-1 sm:p-4 space-y-6 text-stone-800 dark:text-cream-100 relative">
            <EventsNoticesHeader
                t={t}
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                isAdding={isAdding}
                onAddClick={handleAddClick}
                items={activeTab === "events" ? eventsList : noticesList}
                selectedId={activeTab === "events" ? selectedEventId : selectedNoticeId}
                onSelectChange={(id) => {
                    if (activeTab === "events") {
                        setSelectedEventId(id);
                    } else {
                        setSelectedNoticeId(id);
                    }
                    setIsAdding(false);
                }}
                lang={lang}
            />

            {feedback.message && (
                <div
                    className={`px-4 py-3 rounded-lg text-sm font-medium ${feedback.type === "success"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30"
                            : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border border-red-300 dark:border-red-500/30"
                        }`}
                >
                    {feedback.message}
                </div>
            )}

            {activeTab === "events" ? (
                loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400" />
                    </div>
                ) : isAdding ? (
                    <EventForm
                        t={t}
                        isEditMode={false}
                        onSubmit={handleCreateEvent}
                        onCancel={() => setIsAdding(false)}
                        submitting={submitting}
                        lang={lang}
                    />
                ) : selectedEvent ? (
                    <EventForm
                        t={t}
                        initialData={selectedEvent}
                        isEditMode={true}
                        onSubmit={handleUpdateEvent}
                        onDelete={confirmDeleteEvent}
                        submitting={submitting}
                        lang={lang}
                    />
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-[#2a080e] rounded-xl border border-stone-200 dark:border-amber-500/20 text-sm text-stone-500 dark:text-cream-200/70">
                        {t.selectEventPlaceholder || "No events found. Click 'Add Event' to create one."}
                    </div>
                )
            ) : (
                /* Notice Management Section */
                loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400" />
                    </div>
                ) : isAdding ? (
                    <NoticeForm
                        t={t}
                        isEditMode={false}
                        onSubmit={handleCreateNotice}
                        onCancel={() => setIsAdding(false)}
                        submitting={submitting}
                    />
                ) : selectedNotice ? (
                    <NoticeForm
                        t={t}
                        initialData={selectedNotice}
                        isEditMode={true}
                        onSubmit={handleUpdateNotice}
                        onDelete={confirmDeleteNotice}
                        submitting={submitting}
                    />
                ) : (
                    <div className="text-center py-12 bg-white dark:bg-[#2a080e] rounded-xl border border-stone-200 dark:border-amber-500/20 text-sm text-stone-500 dark:text-cream-200/70">
                        {t.selectNoticePlaceholder || "No notices found. Click 'Add Notice' to create one."}
                    </div>
                )
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#2a080e] border border-stone-200 dark:border-amber-500/20 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-stone-400 hover:text-stone-700 dark:hover:text-cream-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-stone-900 dark:text-cream-100">
                                {t.confirmDeleteTitle || "Are you sure?"}
                            </h3>
                            <p className="text-sm text-stone-600 dark:text-cream-200/70">
                                {t.confirmDelete || "You are about to delete this item. This action cannot be undone."}
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-amber-500/10">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-lg border border-stone-300 dark:border-amber-500/20 text-stone-700 dark:text-cream-200 hover:bg-stone-100 dark:hover:bg-[#1a0509] text-sm font-semibold transition-colors"
                            >
                                {t.btnCancel || "Cancel"}
                            </button>
                            <button
                                type="button"
                                onClick={activeTab === "events" ? executeDeleteEvent : executeDeleteNotice}
                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors shadow-sm"
                            >
                                {t.btnDelete || "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}