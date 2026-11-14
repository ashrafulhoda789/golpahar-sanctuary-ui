/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { Loader2, Plus, AlertTriangle, X } from "lucide-react";
import { translations } from "../../locales/translations";
import { useLanguage } from "../../context/LanguageContext";
import { getAllAlbums, getAllMedia } from "../../lib/api/gallery";
import { createAlbum, deleteAlbum, uploadMedia, updateMedia, deleteMedia } from "../../lib/actions/gallery";
import GalleryForm from "../../components/admin/gallery/GalleryForm";

export default function GalleryManagementPage() {
    const { lang } = useLanguage();
    const t = translations[lang]?.adminGallery || translations.en.adminGallery;

    const [activeTab, setActiveTab] = useState("album"); // 'album' | 'media'
    const [isAdding, setIsAdding] = useState(false);

    // States
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

    // Album Actions
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

    // Media Actions
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
        <div className="p-1 sm:p-4 space-y-6 text-stone-800 dark:text-cream-100 relative">
          
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-heading font-bold text-maroon-900 dark:text-amber-400">
                        {t.pageTitle}
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-cream-200/70">
                        {t.pageSubtitle}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setIsAdding(true);
                        setFeedback({ type: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {activeTab === "album" ? t.btnAddAlbum : t.btnAddMedia}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-stone-200 dark:border-amber-500/20">
                <button
                    type="button"
                    onClick={() => handleTabChange("album")}
                    className={`px-6 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === "album"
                            ? "border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400"
                            : "border-transparent text-stone-500 hover:text-stone-800 dark:text-cream-200/60 dark:hover:text-cream-100"
                        }`}
                >
                    {t.tabAlbum}
                </button>
                <button
                    type="button"
                    onClick={() => handleTabChange("media")}
                    className={`px-6 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === "media"
                            ? "border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400"
                            : "border-transparent text-stone-500 hover:text-stone-800 dark:text-cream-200/60 dark:hover:text-cream-100"
                        }`}
                >
                    {t.tabMedia}
                </button>
            </div>

            {/* Dropdown Selector */}
            {!isAdding && (
                <div className="max-w-md">
                    <select
                        value={activeTab === "album" ? selectedAlbumId : selectedMediaId}
                        onChange={(e) => {
                            if (activeTab === "album") setSelectedAlbumId(e.target.value);
                            else setSelectedMediaId(e.target.value);
                        }}
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 dark:border-amber-500/20 bg-white dark:bg-[#2a080e] text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        {activeTab === "album" ? (
                            <>
                                <option value="">{t.selectAlbumPlaceholder}</option>
                                {albumsList.map((alb) => (
                                    <option key={alb.id} value={alb.id}>
                                        {lang === "bn" ? alb.title_bn || alb.titleBn : alb.title_en || alb.titleEn}
                                    </option>
                                ))}
                            </>
                        ) : (
                            <>
                                <option value="">{t.selectMediaPlaceholder}</option>
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

            {/* Main Forms */}
            {activeTab === "album" ? (
                loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400" />
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
                    <div className="text-center py-12 bg-white dark:bg-[#2a080e] rounded-xl border border-stone-200 dark:border-amber-500/20 text-sm text-stone-500 dark:text-cream-200/70">
                        {t.selectAlbumPlaceholder}
                    </div>
                )
            ) : (
                loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-600 dark:text-amber-400" />
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
                    <div className="text-center py-12 bg-white dark:bg-[#2a080e] rounded-xl border border-stone-200 dark:border-amber-500/20 text-sm text-stone-500 dark:text-cream-200/70">
                        {t.selectMediaPlaceholder}
                    </div>
                )
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#2a080e] border border-stone-200 dark:border-amber-500/20 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-stone-400 hover:text-stone-700 dark:hover:text-cream-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-stone-900 dark:text-cream-100">
                                {t.confirmDelete || "Are you sure?"}
                            </h3>
                            <p className="text-sm text-stone-600 dark:text-cream-200/70">
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-amber-500/10">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-lg border border-stone-300 dark:border-amber-500/20 text-stone-700 dark:text-cream-200 hover:bg-stone-100 dark:hover:bg-[#1a0509] text-sm font-semibold"
                            >
                                {t.btnCancel}
                            </button>
                            <button
                                type="button"
                                onClick={activeTab === "album" ? executeDeleteAlbum : executeDeleteMedia}
                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-sm"
                            >
                                {t.btnDelete}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}