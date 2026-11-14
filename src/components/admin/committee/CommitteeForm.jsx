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
            // eslint-disable-next-line react-hooks/set-state-in-effect
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
                    {isEditMode ? t.editMemberTitle : t.createMemberTitle}
                </h2>
                {!isEditMode && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800 dark:text-cream-200/70 dark:hover:text-cream-100"
                    >
                        <X className="w-4 h-4" /> {t.btnCancel}
                    </button>
                )}
            </div>

            {/* Name (EN & BN) */}
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

            {/* Position (EN & BN) */}
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

            {/* Photo URL & Display Order */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <label className={labelClass}>{t.photoUrl}</label>
                    <input
                        type="url"
                        name="photo_url"
                        value={formData.photo_url}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className={inputClass}
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

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.phone}</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+8801XXXXXXXXX"
                        className={inputClass}
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
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 dark:border-amber-500/20">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-semibold text-sm transition-colors disabled:opacity-50"
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEditMode ? t.btnUpdate : t.btnSave}
                </button>

                {isEditMode && onDelete && (
                    <button
                        type="button"
                        disabled={submitting}
                        onClick={onDelete}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        {t.btnDelete}
                    </button>
                )}
            </div>
        </form>
    );
}