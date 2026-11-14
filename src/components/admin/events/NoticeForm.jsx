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
            // eslint-disable-next-line react-hooks/set-state-in-effect
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
        "w-full px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-amber-500/20 bg-white dark:bg-[#1a0509] text-stone-800 dark:text-cream-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors";
    const labelClass =
        "block text-xs font-semibold tracking-wider text-stone-600 dark:text-cream-200/80 mb-1.5";

    return (
        <form
            onSubmit={handleFormSubmit}
            className="bg-white dark:bg-[#2a080e] border border-stone-200 dark:border-amber-500/20 rounded-xl p-5 sm:p-6 shadow-sm space-y-5"
        >
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-amber-500/20 pb-3">
                <h2 className="text-lg font-bold text-maroon-900 dark:text-amber-400">
                    {isEditMode ? t.editNoticeTitle || "Edit Notice" : t.createNoticeTitle || "Create New Notice"}
                </h2>
                {!isEditMode && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800 dark:text-cream-200/70 dark:hover:text-cream-100"
                    >
                        <X className="w-4 h-4" /> {t.btnCancel || "Cancel"}
                    </button>
                )}
            </div>

            {/* Title (EN & BN) */}
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

            {/* Category (EN & BN) */}
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

            {/* Dates + Status + Pin */}
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


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                    <label className={labelClass}>{t.attachmentUrl || "Attachment URL (PDF/Image)"}</label>
                    <input
                        type="url"
                        name="attachmentUrl"
                        value={formData.attachmentUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/notice.pdf"
                        className={inputClass}
                    />
                </div>
                <div className="flex items-center gap-3 pt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isPinned"
                            checked={formData.isPinned}
                            onChange={handleChange}
                            className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500"
                        />
                        <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-cream-200 flex items-center gap-1">
                           {t.pinNotice || "Pin to Top (Important)"}
                        </span>
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
                        className={inputClass}
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
                        className={inputClass}
                    />
                </div>
            </div>


            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 dark:border-amber-500/20">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-semibold text-sm transition-colors disabled:opacity-50"
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEditMode ? t.btnUpdate || "Update" : t.btnSave || "Save"}
                </button>

                {isEditMode && onDelete && (
                    <button
                        type="button"
                        disabled={submitting}
                        onClick={onDelete}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        {t.btnDelete || "Delete"}
                    </button>
                )}
            </div>
        </form>
    );
}