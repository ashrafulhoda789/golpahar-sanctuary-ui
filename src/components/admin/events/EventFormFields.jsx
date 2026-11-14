export default function EventFormFields({ t, formData, handleChange, inputClass, labelClass }) {
    return (
        <div className="space-y-5">
            {/* Title (EN & BN) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.titleEn || "Event Title (English)"} *</label>
                    <input
                        type="text"
                        name="title_en"
                        required
                        value={formData.title_en || ""}
                        onChange={handleChange}
                        placeholder="e.g. Annual Shyama Puja"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.titleBn || "Event Title (Bangla)"} *</label>
                    <input
                        type="text"
                        name="title_bn"
                        required
                        value={formData.title_bn || ""}
                        onChange={handleChange}
                        placeholder="যেমন: বার্ষিক শ্রী শ্রী শ্যামা পূজা"
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
                        value={formData.category_en || ""}
                        onChange={handleChange}
                        placeholder="e.g. Festival / Cultural"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.categoryBn || "Category (Bangla)"}</label>
                    <input
                        type="text"
                        name="category_bn"
                        value={formData.category_bn || ""}
                        onChange={handleChange}
                        placeholder="যেমন: মহোৎসব / সাংস্কৃতিক"
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Event Date & Time + Status + Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={labelClass}>{t.eventDateTime || "Event Date & Time"} *</label>
                    <input
                        type="datetime-local"
                        name="eventDateTime"
                        required
                        value={formData.eventDateTime || ""}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.eventStatus || "Event Status"}</label>
                    <select
                        name="eventStatus"
                        value={formData.eventStatus || "Upcoming"}
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="Upcoming">{t.statusUpcoming || "Upcoming"}</option>
                        <option value="Ongoing">{t.statusOngoing || "Ongoing"}</option>
                        <option value="Completed">{t.statusCompleted || "Completed"}</option>
                        <option value="Cancelled">{t.statusCancelled || "Cancelled"}</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>{t.coverImage || "Cover Image URL"}</label>
                    <input
                        type="url"
                        name="coverImage"
                        value={formData.coverImage || ""}
                        onChange={handleChange}
                        placeholder="https://example.com/banner.jpg"
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Location (EN & BN) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.locationEn || "Location (English)"}</label>
                    <input
                        type="text"
                        name="location_en"
                        value={formData.location_en || ""}
                        onChange={handleChange}
                        placeholder="Temple Premises, Golpahar"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.locationBn || "Location (Bangla)"}</label>
                    <input
                        type="text"
                        name="location_bn"
                        value={formData.location_bn || ""}
                        onChange={handleChange}
                        placeholder="মন্দির প্রাঙ্গণ, গোলপাহাড়"
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Organizer (EN & BN) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>{t.organizerEn || "Organizer (English)"}</label>
                    <input
                        type="text"
                        name="organizer_en"
                        value={formData.organizer_en || ""}
                        onChange={handleChange}
                        placeholder="Temple Management Committee"
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className={labelClass}>{t.organizerBn || "Organizer (Bangla)"}</label>
                    <input
                        type="text"
                        name="organizer_bn"
                        value={formData.organizer_bn || ""}
                        onChange={handleChange}
                        placeholder="মন্দির পরিচালনা পরিষদ"
                        className={inputClass}
                    />
                </div>
            </div>
        </div>
    );
}