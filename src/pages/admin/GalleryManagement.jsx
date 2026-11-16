/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Loader2, Plus, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { translations } from "../../locales/translations";
import { useLanguage } from "../../context/LanguageContext";
import { getAllAlbums, getAllMedia } from "../../lib/api/gallery";
import { createAlbum, deleteAlbum, uploadMedia, updateMedia, deleteMedia } from "../../lib/actions/gallery";
import GalleryForm from "../../components/admin/gallery/GalleryForm";

export default function GalleryManagementPage() {
    const { lang } = useLanguage();
    const t = translations[lang]?.adminGallery || translations.en.adminGallery;

    const [activeTab, setActiveTab] = useState("album");
    const [isAdding, setIsAdding] = useState(false);

    const [albumsList, setAlbumsList] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState("");

    const [mediaList, setMediaList] = useState([]);
    const [selectedMediaId, setSelectedMediaId] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showFeedback = (type, message) => {
        setFeedback({ type, message });
        setTimeout(() => setFeedback({ type: "", message: "" }), 4000);
    };

    const fetchAlbums = useCallback(async () => {
        setLoading(true);
        const json = await getAllAlbums();
        if (json.success && Array.isArray(json.data)) {
            setAlbumsList(json.data);
            if (json.data.length > 0 && !selectedAlbumId) {
                setSelectedAlbumId(json.data[0].id);
            }
        }
        setLoading(false);
    }, [selectedAlbumId]);

    const fetchMedia = useCallback(async () => {
        setLoading(true);
        const json = await getAllMedia();
        if (json.success && Array.isArray(json.data)) {
            setMediaList(json.data);
            if (json.data.length > 0 && !selectedMediaId) {
                setSelectedMediaId(json.data[0].id);
            }
        }
        setLoading(false);
    }, [selectedMediaId]);

    useEffect(() => {
        if (activeTab === "album") {
            fetchAlbums();
        } else {
            fetchMedia();
        }
    }, [activeTab, fetchAlbums, fetchMedia]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsAdding(false);
        setFeedback({ type: "", message: "" });
    };

    const handleCreateAlbum = async (formData) => {
        setSubmitting(true);
        const json = await createAlbum(formData);
        if (json.success) {
            showFeedback("success", json.message || "Album created!");
            setIsAdding(false);
            await fetchAlbums();
            if (json.data?.id) setSelectedAlbumId(json.data.id);
        } else {
            showFeedback("error", json.message || "Failed to create album");
        }
        setSubmitting(false);
    };

    const executeDeleteAlbum = async () => {
        setShowDeleteModal(false);
        setSubmitting(true);
        const json = await deleteAlbum(selectedAlbumId);
        if (json.success) {
            showFeedback("success", json.message || "Album deleted!");
            setSelectedAlbumId("");
            await fetchAlbums();
        } else {
            showFeedback("error", json.message || "Failed to delete album");
        }
        setSubmitting(false);
    };

    const handleUploadMedia = async (formData) => {
        setSubmitting(true);
        const json = await uploadMedia(formData);
        if (json.success) {
            showFeedback("success", json.message || "Media uploaded!");
            setIsAdding(false);
            await fetchMedia();
            if (json.data?.id) setSelectedMediaId(json.data.id);
        } else {
            showFeedback("error", json.message || "Failed to upload media");
        }
        setSubmitting(false);
    };

    const handleUpdateMedia = async (formData) => {
        if (!selectedMediaId) return;
        setSubmitting(true);
        const json = await updateMedia(selectedMediaId, formData);
        if (json.success) {
            showFeedback("success", json.message || "Media updated!");
            await fetchMedia();
        } else {
            showFeedback("error", json.message || "Failed to update media");
        }
        setSubmitting(false);
    };

    const executeDeleteMedia = async () => {
        setShowDeleteModal(false);
        setSubmitting(true);
        const json = await deleteMedia(selectedMediaId);
        if (json.success) {
            showFeedback("success", json.message || "Media deleted!");
            setSelectedMediaId("");
            await fetchMedia();
        } else {
            showFeedback("error", json.message || "Failed to delete media");
        }
        setSubmitting(false);
    };

    const selectedAlbum = albumsList.find((a) => a.id === selectedAlbumId);
    const selectedMedia = mediaList.find((m) => m.id === selectedMediaId);

    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-stone-900 dark:text-amber-100">
                        {t.pageTitle}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
                        {t.pageSubtitle}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setIsAdding(true);
                        setFeedback({ type: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    {activeTab === "album" ? t.btnAddAlbum : t.btnAddMedia}
                </button>
            </div>

            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-2 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleTabChange("album")}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === "album"
                                ? "bg-amber-600 text-white shadow-xs"
                                : "text-stone-600 dark:text-cream-200 hover:bg-stone-50 dark:hover:bg-[#23060b]"
                            }`}
                    >
                        {t.tabAlbum}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange("media")}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === "media"
                                ? "bg-amber-600 text-white shadow-xs"
                                : "text-stone-600 dark:text-cream-200 hover:bg-stone-50 dark:hover:bg-[#23060b]"
                            }`}
                    >
                        {t.tabMedia}
                    </button>
                </div>

                {!isAdding && (
                    <div className="w-full sm:w-72">
                        <select
                            value={activeTab === "album" ? selectedAlbumId : selectedMediaId}
                            onChange={(e) => {
                                if (activeTab === "album") setSelectedAlbumId(e.target.value);
                                else setSelectedMediaId(e.target.value);
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                        >
                            {activeTab === "album" ? (
                                <>
                                    <option value="" disabled>{t.selectAlbumPlaceholder}</option>
                                    {albumsList.map((alb) => (
                                        <option key={alb.id} value={alb.id}>
                                            {lang === "bn" ? alb.title_bn || alb.titleBn : alb.title_en || alb.titleEn}
                                        </option>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <option value="" disabled>{t.selectMediaPlaceholder}</option>
                                    {mediaList.map((med) => (
                                        <option key={med.id} value={med.id}>
                                            [{med.mediaType.toUpperCase()}] {med.title_en || med.titleEn || med.mediaUrl}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                    </div>
                )}
            </div>

            {feedback.message && (
                <div
                    className={`flex items-center gap-2 p-4 rounded-2xl text-xs font-semibold border ${feedback.type === "success"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-500/10 border-red-500/30 text-red-600"
                        }`}
                >
                    {feedback.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{feedback.message}</span>
                </div>
            )}

            <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm">
                {activeTab === "album" ? (
                    loading ? (
                        <div className="flex justify-center py-16">
                            <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                        </div>
                    ) : isAdding ? (
                        <GalleryForm
                            t={t}
                            type="album"
                            isEditMode={false}
                            onSubmit={handleCreateAlbum}
                            onCancel={() => setIsAdding(false)}
                            submitting={submitting}
                        />
                    ) : selectedAlbum ? (
                        <GalleryForm
                            t={t}
                            type="album"
                            initialData={selectedAlbum}
                            isEditMode={true}
                            onSubmit={() => showFeedback("success", "Album details updated!")}
                            onDelete={() => setShowDeleteModal(true)}
                            submitting={submitting}
                        />
                    ) : (
                        <div className="text-center py-12 text-xs text-stone-500 dark:text-stone-400">
                            {t.selectAlbumPlaceholder}
                        </div>
                    )
                ) : (
                    loading ? (
                        <div className="flex justify-center py-16">
                            <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                        </div>
                    ) : isAdding ? (
                        <GalleryForm
                            t={t}
                            type="media"
                            isEditMode={false}
                            albumsList={albumsList}
                            onSubmit={handleUploadMedia}
                            onCancel={() => setIsAdding(false)}
                            submitting={submitting}
                        />
                    ) : selectedMedia ? (
                        <GalleryForm
                            t={t}
                            type="media"
                            initialData={selectedMedia}
                            isEditMode={true}
                            albumsList={albumsList}
                            onSubmit={handleUpdateMedia}
                            onDelete={() => setShowDeleteModal(true)}
                            submitting={submitting}
                        />
                    ) : (
                        <div className="text-center py-12 text-xs text-stone-500 dark:text-stone-400">
                            {t.selectMediaPlaceholder}
                        </div>
                    )
                )}
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600">
                            <div className="p-3 rounded-2xl bg-red-500/10">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold font-serif text-stone-900 dark:text-amber-100">
                                    {t.confirmDelete || "Are you sure?"}
                                </h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">
                                    This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-cream-200 text-xs font-bold transition cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700"
                            >
                                {t.btnCancel}
                            </button>
                            <button
                                type="button"
                                onClick={activeTab === "album" ? executeDeleteAlbum : executeDeleteMedia}
                                disabled={submitting}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                {submitting ? "Deleting..." : t.btnDelete}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}