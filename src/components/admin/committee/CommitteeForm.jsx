/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Save, Trash2, X, Loader2 } from "lucide-react";

const INITIAL_STATE = {
    name_en: "",
    name_bn: "",
    position_en: "",
    position_bn: "",
    photo_url: "",
    phone: "",
    email: "",
    display_order: 0,
};

export default function CommitteeForm({
    t,
    initialData = null,
    isEditMode = false,
    onSubmit,
    onDelete,
    onCancel,
    submitting = false,
}) {
    const [formData, setFormData] = useState(INITIAL_STATE);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name_en: initialData.nameEn || initialData.name_en || "",
                name_bn: initialData.nameBn || initialData.name_bn || "",
                position_en: initialData.positionEn || initialData.position_en || "",
                position_bn: initialData.positionBn || initialData.position_bn || "",
                photo_url: initialData.photoUrl || initialData.photo_url || "",
                phone: initialData.phone || "",
                email: initialData.email || "",
                display_order: initialData.displayOrder ?? initialData.display_order ?? 0,
            });
        } else {
            setFormData(INITIAL_STATE);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
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
                        {isEditMode ? t.editMemberTitle : t.createMemberTitle}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.nameEn} *</label>
                    <input
                        type="text"
                        name="name_en"
                        required
                        value={formData.name_en}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Subhashis Das"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.nameBn} *</label>
                    <input
                        type="text"
                        name="name_bn"
                        required
                        value={formData.name_bn}
                        onChange={handleChange}
                        placeholder="যেমন: ড. সুভাশিষ দাশ"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.positionEn} *</label>
                    <input
                        type="text"
                        name="position_en"
                        required
                        value={formData.position_en}
                        onChange={handleChange}
                        placeholder="e.g. President"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.positionBn} *</label>
                    <input
                        type="text"
                        name="position_bn"
                        required
                        value={formData.position_bn}
                        onChange={handleChange}
                        placeholder="যেমন: সভাপতি"
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <label className={labelClass}>{t.photoUrl}</label>
                    <input
                        type="url"
                        name="photo_url"
                        value={formData.photo_url}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className={`${inputClass} font-mono`}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.displayOrder}</label>
                    <input
                        type="number"
                        name="display_order"
                        value={formData.display_order}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.phone}</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+8801XXXXXXXXX"
                        className={`${inputClass} font-mono`}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.email}</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="member@example.com"
                        className={`${inputClass} font-mono`}
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