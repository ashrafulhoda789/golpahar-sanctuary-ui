
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Save, Loader2 } from "lucide-react";

const AVAILABLE_ICONS = [
    "Flame", "Sparkles", "Heart", "Sun", "Moon", "Shield", "Star", "Award", "BookOpen", "Users", "Home", "Compass"
];

export default function AboutForm({ data = {}, onChange, onSave, saving = false }) {
    const aboutData = {
        pageTitle_en: data.pageTitle_en || "About Us",
        pageTitle_bn: data.pageTitle_bn || "আমাদের সম্পর্কে",
        pageSubtitle_en: data.pageSubtitle_en || "",
        pageSubtitle_bn: data.pageSubtitle_bn || "",
        imageUrl: data.imageUrl || "",
        whoWeAreTag_en: data.whoWeAreTag_en || "WHO WE ARE",
        whoWeAreTag_bn: data.whoWeAreTag_bn || "আমাদের পরিচয়",
        whoWeAreTitle_en: data.whoWeAreTitle_en || "",
        whoWeAreTitle_bn: data.whoWeAreTitle_bn || "",
        whoWeAreDesc1_en: data.whoWeAreDesc1_en || "",
        whoWeAreDesc1_bn: data.whoWeAreDesc1_bn || "",
        whoWeAreDesc2_en: data.whoWeAreDesc2_en || "",
        whoWeAreDesc2_bn: data.whoWeAreDesc2_bn || "",
        quote_en: data.quote_en || "",
        quote_bn: data.quote_bn || "",
        heritageTag_en: data.heritageTag_en || "TEMPLE HERITAGE & OVERVIEW",
        heritageTag_bn: data.heritageTag_bn || "মন্দিরের ঐতিহ্য ও বিবরণ",
        heritageTitle_en: data.heritageTitle_en || "",
        heritageTitle_bn: data.heritageTitle_bn || "",
        heritageSubtitle_en: data.heritageSubtitle_en || "",
        heritageSubtitle_bn: data.heritageSubtitle_bn || "",
        cards: Array.isArray(data.cards) ? data.cards : []
    };

    const handleChange = (field, value) => {
        onChange({
            ...aboutData,
            [field]: value
        });
    };

    const handleCardChange = (index, field, value) => {
        const updatedCards = [...aboutData.cards];
        updatedCards[index] = {
            ...updatedCards[index],
            [field]: value
        };
        onChange({ ...aboutData, cards: updatedCards });
    };

    const handleAddCard = () => {
        const newCard = {
            icon: "Flame",
            title_en: "",
            title_bn: "",
            description_en: "",
            description_bn: "",
            order: aboutData.cards.length
        };
        onChange({ ...aboutData, cards: [...aboutData.cards, newCard] });
    };

    const handleRemoveCard = (index) => {
        const updatedCards = aboutData.cards.filter((_, i) => i !== index);
        onChange({ ...aboutData, cards: updatedCards });
    };

    const handleMoveCard = (index, direction) => {
        const newCards = [...aboutData.cards];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newCards.length) return;
        const temp = newCards[index];
        newCards[index] = newCards[targetIndex];
        newCards[targetIndex] = temp;
        onChange({ ...aboutData, cards: newCards });
    };

    const inputClass = "w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500";
    const labelClass = "block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1";

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-amber-100">About Us Page Settings</h3>
                <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">Manage banner headers, images, 'Who We Are' section, quotes, and overview cards.</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">1. Top Banner Section</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Page Title (English)</label>
                        <input type="text" value={aboutData.pageTitle_en} onChange={(e) => handleChange("pageTitle_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Page Title (বাংলা)</label>
                        <input type="text" value={aboutData.pageTitle_bn} onChange={(e) => handleChange("pageTitle_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Page Subtitle (English)</label>
                        <textarea rows={2} value={aboutData.pageSubtitle_en} onChange={(e) => handleChange("pageSubtitle_en", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Page Subtitle (বাংলা)</label>
                        <textarea rows={2} value={aboutData.pageSubtitle_bn} onChange={(e) => handleChange("pageSubtitle_bn", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                </div>
            </div>


            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">2. Who We Are Section & Featured Image</h4>

                <div>
                    <label className={labelClass}>Featured Image URL (Left side arch image)</label>
                    <input
                        type="url"
                        value={aboutData.imageUrl}
                        onChange={(e) => handleChange("imageUrl", e.target.value)}
                        placeholder="https://i.ibb.co.com/.../temple.jpg"
                        className={`${inputClass} font-mono`}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Section Tag (EN)</label>
                        <input type="text" value={aboutData.whoWeAreTag_en} onChange={(e) => handleChange("whoWeAreTag_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Section Tag (BN)</label>
                        <input type="text" value={aboutData.whoWeAreTag_bn} onChange={(e) => handleChange("whoWeAreTag_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Main Heading (English)</label>
                        <input type="text" value={aboutData.whoWeAreTitle_en} onChange={(e) => handleChange("whoWeAreTitle_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Main Heading (বাংলা)</label>
                        <input type="text" value={aboutData.whoWeAreTitle_bn} onChange={(e) => handleChange("whoWeAreTitle_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Description Paragraph 1 (EN)</label>
                        <textarea rows={3} value={aboutData.whoWeAreDesc1_en} onChange={(e) => handleChange("whoWeAreDesc1_en", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Description Paragraph 1 (BN)</label>
                        <textarea rows={3} value={aboutData.whoWeAreDesc1_bn} onChange={(e) => handleChange("whoWeAreDesc1_bn", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Description Paragraph 2 (EN)</label>
                        <textarea rows={3} value={aboutData.whoWeAreDesc2_en} onChange={(e) => handleChange("whoWeAreDesc2_en", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Description Paragraph 2 (BN)</label>
                        <textarea rows={3} value={aboutData.whoWeAreDesc2_bn} onChange={(e) => handleChange("whoWeAreDesc2_bn", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Special Quote / Scripture (EN)</label>
                        <input type="text" value={aboutData.quote_en} onChange={(e) => handleChange("quote_en", e.target.value)} placeholder="e.g. May all beings be happy..." className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Special Quote / Scripture (BN)</label>
                        <input type="text" value={aboutData.quote_bn} onChange={(e) => handleChange("quote_bn", e.target.value)} placeholder="যেমন: সর্ব ভবন্তু সুখিনঃ..." className={inputClass} />
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">3. Temple Heritage & Overview Section</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Heritage Tag (EN)</label>
                        <input type="text" value={aboutData.heritageTag_en} onChange={(e) => handleChange("heritageTag_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Heritage Tag (BN)</label>
                        <input type="text" value={aboutData.heritageTag_bn} onChange={(e) => handleChange("heritageTag_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Heritage Title (EN)</label>
                        <input type="text" value={aboutData.heritageTitle_en} onChange={(e) => handleChange("heritageTitle_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Heritage Title (BN)</label>
                        <input type="text" value={aboutData.heritageTitle_bn} onChange={(e) => handleChange("heritageTitle_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Heritage Subtitle / Description</label>
                    <textarea rows={2} value={aboutData.heritageSubtitle_en} onChange={(e) => handleChange("heritageSubtitle_en", e.target.value)} className={`${inputClass} resize-none`} placeholder="Managed by a dedicated board of trustees..." />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">4. Overview Cards Builder</h4>
                        <p className="text-[11px] text-stone-500 dark:text-cream-200/70">Add, reorder, or customize the feature cards displayed in the heritage section.</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleAddCard}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add New Card
                    </button>
                </div>

                {aboutData.cards.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-stone-200 dark:border-amber-500/20 rounded-2xl text-xs text-stone-400">
                        No cards added yet. Click 'Add New Card' to create one.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {aboutData.cards.map((card, index) => (
                            <div key={index} className="bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/25 rounded-2xl p-4 space-y-3 relative shadow-2xs">
                                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-amber-500/15">
                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                        <Sparkles className="w-3.5 h-3.5" /> Card #{index + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            disabled={index === 0}
                                            onClick={() => handleMoveCard(index, "up")}
                                            className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-cream-200 disabled:opacity-30 cursor-pointer"
                                            title="Move Up"
                                        >
                                            <ArrowUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            disabled={index === aboutData.cards.length - 1}
                                            onClick={() => handleMoveCard(index, "down")}
                                            className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-cream-200 disabled:opacity-30 cursor-pointer"
                                            title="Move Down"
                                        >
                                            <ArrowDown className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCard(index)}
                                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-600 hover:text-white transition cursor-pointer ml-2"
                                            title="Delete Card"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className={labelClass}>Select Icon</label>
                                        <select
                                            value={card.icon || "Flame"}
                                            onChange={(e) => handleCardChange(index, "icon", e.target.value)}
                                            className={inputClass}
                                        >
                                            {AVAILABLE_ICONS.map((iconName) => (
                                                <option key={iconName} value={iconName}>{iconName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Card Title (English) *</label>
                                        <input
                                            type="text"
                                            value={card.title_en || ""}
                                            onChange={(e) => handleCardChange(index, "title_en", e.target.value)}
                                            placeholder="e.g. DAILY VEDIC WORSHIP"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Card Title (বাংলা)</label>
                                        <input
                                            type="text"
                                            value={card.title_bn || ""}
                                            onChange={(e) => handleCardChange(index, "title_bn", e.target.value)}
                                            placeholder="যেমন: নিত্য বৈদিক পূজা"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Description (English)</label>
                                        <textarea
                                            rows={2}
                                            value={card.description_en || ""}
                                            onChange={(e) => handleCardChange(index, "description_en", e.target.value)}
                                            placeholder="Card description in English..."
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Description (বাংলা)</label>
                                        <textarea
                                            rows={2}
                                            value={card.description_bn || ""}
                                            onChange={(e) => handleCardChange(index, "description_bn", e.target.value)}
                                            placeholder="বাংলায় বিবরণ..."
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {onSave && (
                <div className="pt-6 border-t border-stone-100 dark:border-amber-500/15 flex justify-end">
                    <button
                        type="button"
                        onClick={onSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
                    </button>
                </div>
            )}
        </div>
    );
}