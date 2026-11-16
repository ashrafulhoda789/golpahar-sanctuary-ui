/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Save, Trash2, X, Loader2 } from "lucide-react";

const INITIAL_NOTICE_STATE = {
    title_en: "",
    title_bn: "",
    category_en: "General",
    category_bn: "সাধারণ",
    description_en: "",
    description_bn: "",
    attachmentUrl: "",
    publishDate: "",
    expiryDate: "",
    isPinned: false,
    status: "Published",
};

export default function NoticeForm({
    t,
    initialData = null,
    isEditMode = false,
    onSubmit,
    onDelete,
    onCancel,
    submitting = false,
}) {
    const [formData, setFormData] = useState(INITIAL_NOTICE_STATE);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title_en: initialData.title_en || "",
                title_bn: initialData.title_bn || "",
                category_en: initialData.category_en || "General",
                category_bn: initialData.category_bn || "সাধারণ",
                description_en: initialData.description_en || "",
                description_bn: initialData.description_bn || "",
                attachmentUrl: initialData.attachmentUrl || "",
                publishDate: initialData.publishDate || "",
                expiryDate: initialData.expiryDate || "",
                isPinned: Boolean(initialData.isPinned),
                status: initialData.status || "Published",
            });
        } else {
            setFormData(INITIAL_NOTICE_STATE);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
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
                        {isEditMode ? t.editNoticeTitle || "Edit Notice" : t.createNoticeTitle || "Create New Notice"}
                    </h2>
                </div>
                {!isEditMode && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-xs font-bold text-stone-400 hover:text-stone-700 dark:hover:text-amber-200 cursor-pointer flex items-center gap-1"
                    >
                        <X className="w-4 h-4" /> {t.btnCancel || "Cancel"}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.titleEn || "Notice Title (English)"} *</label>
                    <input
                        type="text"
                        name="title_en"
                        required
                        value={formData.title_en}
                        onChange={handleChange}
                        placeholder="e.g. Committee Meeting Notice"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.titleBn || "Notice Title (Bangla)"} *</label>
                    <input
                        type="text"
                        name="title_bn"
                        required
                        value={formData.title_bn}
                        onChange={handleChange}
                        placeholder="যেমন: জরুরি মিটিং সংক্রান্ত বিজ্ঞপ্তি"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.categoryEn || "Category (English)"}</label>
                    <input
                        type="text"
                        name="category_en"
                        value={formData.category_en}
                        onChange={handleChange}
                        placeholder="General / Urgent"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.categoryBn || "Category (Bangla)"}</label>
                    <input
                        type="text"
                        name="category_bn"
                        value={formData.category_bn}
                        onChange={handleChange}
                        placeholder="সাধারণ / জরুরি"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={labelClass}>{t.publishDate || "Publish Date"} *</label>
                    <input
                        type="datetime-local"
                        name="publishDate"
                        required
                        value={formData.publishDate}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.expiryDate || "Expiry Date (Optional)"}</label>
                    <input
                        type="datetime-local"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.status || "Status"}</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-stone-50 dark:bg-[#23060b] p-4 rounded-2xl border border-stone-200 dark:border-amber-500/20">
                <div>
                    <label className={labelClass}>{t.attachmentUrl || "Attachment URL (PDF/Image)"}</label>
                    <input
                        type="url"
                        name="attachmentUrl"
                        value={formData.attachmentUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/notice.pdf"
                        className={`${inputClass} font-mono`}
                    />
                </div>
                <div className="flex items-center gap-2 pt-2 sm:pt-0">
                    <input
                        type="checkbox"
                        name="isPinned"
                        id="isPinned"
                        checked={formData.isPinned}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <label htmlFor="isPinned" className="text-xs font-bold text-stone-700 dark:text-amber-200 cursor-pointer">
                        {t.pinNotice || "Pin to Top (Important)"}
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.descEn || "Description (English)"} *</label>
                    <textarea
                        name="description_en"
                        required
                        rows={4}
                        value={formData.description_en}
                        onChange={handleChange}
                        placeholder="Write notice details in English..."
                        className={`${inputClass} resize-none`}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.descBn || "Description (Bangla)"} *</label>
                    <textarea
                        name="description_bn"
                        required
                        rows={4}
                        value={formData.description_bn}
                        onChange={handleChange}
                        placeholder="বাংলায় নোটিশের বিস্তারিত লিখুন..."
                        className={`${inputClass} resize-none`}
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEditMode ? t.btnUpdate || "Update" : t.btnSave || "Save"}
                </button>

                {isEditMode && onDelete && (
                    <button
                        type="button"
                        disabled={submitting}
                        onClick={onDelete}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold transition cursor-pointer disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        {t.btnDelete || "Delete"}
                    </button>
                )}
            </div>
        </form>
    );
}