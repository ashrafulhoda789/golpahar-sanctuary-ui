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
        "w-full px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-amber-500/20 bg-white dark:bg-[#1a0509] text-stone-800 dark:text-cream-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors";
    const labelClass =
        "block text-xs font-semibold tracking-wider text-stone-600 dark:text-cream-200/80 mb-1.5";

    return (
        <form
            onSubmit={handleFormSubmit}
            className="bg-white dark:bg-[#2a080e] border border-stone-200 dark:border-amber-500/20 rounded-xl p-4 sm:p-6 shadow-sm space-y-6"
        >
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-amber-500/20 pb-3">
                <h2 className="text-lg font-bold text-maroon-900 dark:text-amber-400">
                    {isEditMode ? t.editEventTitle : t.createEventTitle}
                </h2>
                {!isEditMode && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800 dark:text-cream-200/70 dark:hover:text-cream-100 cursor-pointer"
                    >
                        <X className="w-4 h-4" /> {t.btnCancel}
                    </button>
                )}
            </div>

            {/* Main Form Fields Component */}
            <EventFormFields
                t={t}
                formData={formData}
                handleChange={handleChange}
                inputClass={inputClass}
                labelClass={labelClass}
            />

            {/* Registration Required & Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-stone-50 dark:bg-[#1a0509]/60 p-4 rounded-lg border border-stone-200 dark:border-amber-500/10">
                <div>
                    <label className={labelClass}>{t.regRequired}</label>
                    <div className="flex items-center gap-3 mt-1">
                        <button
                            type="button"
                            onClick={() => handleRegistrationToggle(true)}
                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${formData.isRegistrationRequired
                                ? "bg-amber-600 text-white"
                                : "bg-stone-200 dark:bg-[#2a080e] text-stone-700 dark:text-cream-200"
                                }`}
                        >
                            {t.yes}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRegistrationToggle(false)}
                            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${!formData.isRegistrationRequired
                                ? "bg-amber-600 text-white"
                                : "bg-stone-200 dark:bg-[#2a080e] text-stone-700 dark:text-cream-200"
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
                        className={inputClass}
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
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Schedule Section */}
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

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 dark:border-amber-500/20">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-maroon-900 hover:bg-maroon-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-semibold text-sm transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEditMode ? t.btnUpdate : t.btnSave}
                </button>

                {isEditMode && onDelete && (
                    <button
                        type="button"
                        disabled={submitting}
                        onClick={onDelete}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" />
                        {t.btnDelete}
                    </button>
                )}
            </div>
        </form>
    );
}