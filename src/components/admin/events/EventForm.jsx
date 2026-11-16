/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Save, Trash2, X, Loader2 } from "lucide-react";
import EventFormFields from "./EventFormFields";
import EventScheduleSection from "./EventScheduleSection";

const INITIAL_FORM_STATE = {
    title_en: "",
    title_bn: "",
    category_en: "",
    category_bn: "",
    description_en: "",
    description_bn: "",
    coverImage: "",
    eventDateTime: "",
    location_en: "",
    location_bn: "",
    organizer_en: "",
    organizer_bn: "",
    isRegistrationRequired: false,
    registrationDeadline: "",
    eventStatus: "Upcoming",
    schedules: [],
};

export default function EventForm({
    t,
    initialData = null,
    isEditMode = false,
    onSubmit,
    onDelete,
    onCancel,
    submitting = false,
    lang = "en",
}) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title_en: initialData.title_en || initialData.titleEn || "",
                title_bn: initialData.title_bn || initialData.titleBn || "",
                category_en: initialData.category_en || initialData.categoryEn || "",
                category_bn: initialData.category_bn || initialData.categoryBn || "",
                description_en: initialData.description_en || initialData.descriptionEn || "",
                description_bn: initialData.description_bn || initialData.descriptionBn || "",
                coverImage: initialData.coverImage || "",
                eventDateTime: initialData.eventDateTime || initialData.event_date_time || "",
                location_en: initialData.location_en || initialData.locationEn || "",
                location_bn: initialData.location_bn || initialData.locationBn || "",
                organizer_en: initialData.organizer_en || initialData.organizerEn || "",
                organizer_bn: initialData.organizer_bn || initialData.organizerBn || "",
                isRegistrationRequired: Boolean(initialData.isRegistrationRequired ?? initialData.is_registration_required),
                registrationDeadline: initialData.registrationDeadline || initialData.registration_deadline || "",
                eventStatus: initialData.eventStatus || initialData.event_status || "Upcoming",
                schedules: Array.isArray(initialData.schedules)
                    ? initialData.schedules.map((s) => {
                        let parsedActivities = [];
                        try {
                            if (typeof s.activities === "string") {
                                parsedActivities = JSON.parse(s.activities);
                            } else if (Array.isArray(s.activities)) {
                                parsedActivities = s.activities;
                            }
                        // eslint-disable-next-line no-unused-vars
                        } catch (e) {
                            parsedActivities = [];
                        }

                        return {
                            day_label_en: s.dayLabelEn || s.day_label_en || "",
                            day_label_bn: s.dayLabelBn || s.day_label_bn || "",
                            schedule_date: s.scheduleDate || s.schedule_date || "",
                            day_title_en: s.dayTitleEn || s.day_title_en || "",
                            day_title_bn: s.dayTitleBn || s.day_title_bn || "",
                            activities: parsedActivities.map(act => ({
                                time: act.time || "",
                                name_en: act.name_en || act.nameEn || "",
                                name_bn: act.name_bn || act.nameBn || ""
                            }))
                        };
                    })
                    : [],
            });
        } else {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegistrationToggle = (val) => {
        setFormData((prev) => ({
            ...prev,
            isRegistrationRequired: val,
            registrationDeadline: val ? prev.registrationDeadline : "",
        }));
    };

    const handleAddSchedule = () => {
        setFormData((prev) => ({
            ...prev,
            schedules: [
                ...prev.schedules,
                {
                    day_label_en: `Day ${prev.schedules.length + 1}`,
                    day_label_bn: `দিন ${prev.schedules.length + 1}`,
                    schedule_date: "",
                    day_title_en: "",
                    day_title_bn: "",
                    activities: [],
                },
            ],
        }));
    };

    const handleScheduleChange = (index, field, value) => {
        const updatedSchedules = [...formData.schedules];
        updatedSchedules[index][field] = value;
        setFormData((prev) => ({ ...prev, schedules: updatedSchedules }));
    };

    const handleRemoveSchedule = (index) => {
        const updatedSchedules = formData.schedules.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, schedules: updatedSchedules }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const cleanedSchedules = formData.schedules
            .filter((sch) => sch.schedule_date && sch.schedule_date.trim() !== "")
            .map((sch) => ({
                ...sch,
                activities: (sch.activities || []).filter(
                    (act) => act.time && (act.name_en || act.name_bn)
                ),
            }));

        const payload = {
            ...formData,
            schedules: cleanedSchedules,
        };

        onSubmit(payload);
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
                        {isEditMode ? t.editEventTitle : t.createEventTitle}
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

            <EventFormFields
                t={t}
                formData={formData}
                handleChange={handleChange}
                inputClass={inputClass}
                labelClass={labelClass}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-stone-50 dark:bg-[#23060b] p-4 rounded-2xl border border-stone-200 dark:border-amber-500/20">
                <div>
                    <label className={labelClass}>{t.regRequired}</label>
                    <div className="flex items-center gap-3 mt-1">
                        <button
                            type="button"
                            onClick={() => handleRegistrationToggle(true)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${formData.isRegistrationRequired
                                    ? "bg-amber-600 text-white shadow-xs"
                                    : "bg-white dark:bg-stone-800 text-stone-700 dark:text-cream-200 border border-stone-200 dark:border-amber-500/20"
                                }`}
                        >
                            {t.yes}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRegistrationToggle(false)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${!formData.isRegistrationRequired
                                    ? "bg-amber-600 text-white shadow-xs"
                                    : "bg-white dark:bg-stone-800 text-stone-700 dark:text-cream-200 border border-stone-200 dark:border-amber-500/20"
                                }`}
                        >
                            {t.no}
                        </button>
                    </div>
                </div>

                {formData.isRegistrationRequired && (
                    <div>
                        <label className={labelClass}>{t.regDeadline}</label>
                        <input
                            type="datetime-local"
                            name="registrationDeadline"
                            value={formData.registrationDeadline}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.descEn}</label>
                    <textarea
                        name="description_en"
                        rows={3}
                        value={formData.description_en}
                        onChange={handleChange}
                        placeholder="Write event details in English..."
                        className={`${inputClass} resize-none`}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.descBn}</label>
                    <textarea
                        name="description_bn"
                        rows={3}
                        value={formData.description_bn}
                        onChange={handleChange}
                        placeholder="বাংলায় অনুষ্ঠানের বিস্তারিত লিখুন..."
                        className={`${inputClass} resize-none`}
                    />
                </div>
            </div>

            <EventScheduleSection
                schedules={formData.schedules}
                onAddSchedule={handleAddSchedule}
                onScheduleChange={handleScheduleChange}
                onRemoveSchedule={handleRemoveSchedule}
                inputClass={inputClass}
                labelClass={labelClass}
                t={t}
                lang={lang}
            />

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