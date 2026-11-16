/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Save, Trash2, X, Loader2, Star } from "lucide-react";

export default function GalleryForm({
    t,
    type = "album", 
    initialData = null,
    isEditMode = false,
    albumsList = [],
    onSubmit,
    onDelete,
    onCancel,
    submitting = false,
}) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (initialData) {
            if (type === "album") {
                setFormData({
                    title_en: initialData.titleEn || initialData.title_en || "",
                    title_bn: initialData.titleBn || initialData.title_bn || "",
                    description_en: initialData.descriptionEn || initialData.description_en || "",
                    description_bn: initialData.descriptionBn || initialData.description_bn || "",
                    coverImage: initialData.coverImage || "",
                });
            } else {
                setFormData({
                    albumId: initialData.albumId || "",
                    title_en: initialData.titleEn || initialData.title_en || "",
                    title_bn: initialData.titleBn || initialData.title_bn || "",
                    caption_en: initialData.captionEn || initialData.caption_en || "",
                    caption_bn: initialData.captionBn || initialData.caption_bn || "",
                    mediaUrl: initialData.mediaUrl || "",
                    mediaType: initialData.mediaType || "image",
                    isFeaturedVideo: Boolean(initialData.isFeaturedVideo),
                });
            }
        } else {
            if (type === "album") {
                setFormData({
                    title_en: "",
                    title_bn: "",
                    description_en: "",
                    description_bn: "",
                    coverImage: "",
                });
            } else {
                setFormData({
                    albumId: "",
                    title_en: "",
                    title_bn: "",
                    caption_en: "",
                    caption_bn: "",
                    mediaUrl: "",
                    mediaType: "image",
                    isFeaturedVideo: false,
                });
            }
        }
    }, [initialData, type]);

    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: inputType === "checkbox" ? checked : value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputClass =
        "w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500";
    const labelClass =
        "block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1";

    return (
        <form
            onSubmit={handleFormSubmit}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-amber-500/15">
                <div>
                    <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white mb-2">
                        {isEditMode ? 'Edit Mode' : 'Creation Mode'}
                    </span>
                    <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-amber-100">
                        {isEditMode
                            ? type === "album"
                                ? t.editAlbumTitle
                                : t.editMediaTitle
                            : type === "album"
                                ? t.createAlbumTitle
                                : t.createMediaTitle}
                    </h2>
                </div>
                {!isEditMode && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-xs font-bold text-stone-400 hover:text-stone-700 dark:hover:text-amber-200 cursor-pointer flex items-center gap-1"
                    >
                        <X className="w-4 h-4" /> {t.btnCancel}
                    </button>
                )}
            </div>

            {type === "album" ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>{t.titleEn} *</label>
                            <input
                                type="text"
                                name="title_en"
                                required
                                value={formData.title_en || ""}
                                onChange={handleChange}
                                placeholder="e.g. Shyama Puja 2026"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>{t.titleBn} *</label>
                            <input
                                type="text"
                                name="title_bn"
                                required
                                value={formData.title_bn || ""}
                                onChange={handleChange}
                                placeholder="যেমন: শ্যামা পূজা ২০২৬"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Album Cover Image URL</label>
                        <input
                            type="url"
                            name="coverImage"
                            value={formData.coverImage || ""}
                            onChange={handleChange}
                            placeholder="https://example.com/cover.jpg"
                            className={`${inputClass} font-mono`}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>{t.captionEn}</label>
                            <textarea
                                name="description_en"
                                rows={3}
                                value={formData.description_en || ""}
                                onChange={handleChange}
                                placeholder="Album description..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>{t.captionBn}</label>
                            <textarea
                                name="description_bn"
                                rows={3}
                                value={formData.description_bn || ""}
                                onChange={handleChange}
                                placeholder="অ্যালবামের বিবরণ..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>{t.mediaType}</label>
                            <select
                                name="mediaType"
                                value={formData.mediaType || "image"}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="image">{t.typeImage}</option>
                                <option value="video">{t.typeVideo}</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>{t.selectAlbumLabel}</label>
                            <select
                                name="albumId"
                                value={formData.albumId || ""}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="">{t.noAlbum}</option>
                                {albumsList.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.title_en || album.titleEn}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>{t.mediaUrl} *</label>
                        <input
                            type="url"
                            name="mediaUrl"
                            required
                            value={formData.mediaUrl || ""}
                            onChange={handleChange}
                            placeholder="https://example.com/photo.jpg or YouTube URL"
                            className={`${inputClass} font-mono`}
                        />
                    </div>

                    {formData.mediaType === "video" && (
                        <div className="bg-stone-50 dark:bg-[#23060b] p-4 rounded-2xl border border-stone-200 dark:border-amber-500/20 flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="isFeaturedVideo"
                                id="isFeaturedVideo"
                                checked={formData.isFeaturedVideo || false}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                            <label
                                htmlFor="isFeaturedVideo"
                                className="text-xs font-bold text-stone-700 dark:text-amber-200 flex items-center gap-1.5 cursor-pointer"
                            >
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {t.featuredVideoLabel}
                            </label>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>{t.titleEn}</label>
                            <input
                                type="text"
                                name="title_en"
                                value={formData.title_en || ""}
                                onChange={handleChange}
                                placeholder="Media Title"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>{t.titleBn}</label>
                            <input
                                type="text"
                                name="title_bn"
                                value={formData.title_bn || ""}
                                onChange={handleChange}
                                placeholder="মিডিয়ার শিরোনাম"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>{t.captionEn}</label>
                            <textarea
                                name="caption_en"
                                rows={3}
                                value={formData.caption_en || ""}
                                onChange={handleChange}
                                placeholder="Write caption..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>{t.captionBn}</label>
                            <textarea
                                name="caption_bn"
                                rows={3}
                                value={formData.caption_bn || ""}
                                onChange={handleChange}
                                placeholder="ক্যাপশন লিখুন..."
                                className={`${inputClass} resize-none`}
                            />
                        </div>
                    </div>
                </>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEditMode ? t.btnUpdate : t.btnSave}
                </button>

                {isEditMode && onDelete && (
                    <button
                        type="button"
                        disabled={submitting}
                        onClick={onDelete}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold transition cursor-pointer disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        {t.btnDelete}
                    </button>
                )}
            </div>
        </form>
    );
}