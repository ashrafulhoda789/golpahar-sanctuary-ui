import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Save, Loader2 } from "lucide-react";
import HistoryMilestoneModal from "./HistoryMilestoneModal";
import HistoryTempleInfoModal from "./HistoryTempleInfoModal";

const AVAILABLE_ICONS = [
    "Calendar", "Award", "Sparkles", "Flame", "Shield", "Star", "BookOpen", "Users", "Compass", "Clock", "Heart", "Sun"
];

export default function HistoryForm({ data = {}, onChange, onSave, saving = false }) {
    const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const historyData = {
        pageTitle_en: data.pageTitle_en || "Sacred Heritage",
        pageTitle_bn: data.pageTitle_bn || "পবিত্র ঐতিহ্য",
        pageSubtitle_en: data.pageSubtitle_en || "",
        pageSubtitle_bn: data.pageSubtitle_bn || "",
        description_en: data.description_en || "",
        description_bn: data.description_bn || "",
        
        sanctuaryBadge_en: data.sanctuaryBadge_en || "PANCHLAISH, CHATTOGRAM",
        sanctuaryBadge_bn: data.sanctuaryBadge_bn || "পাঁচলাইশ, চট্টগ্রাম",
        sanctuaryTitle_en: data.sanctuaryTitle_en || "Location & Sanctuary",
        sanctuaryTitle_bn: data.sanctuaryTitle_bn || "অবস্থান ও অভয়ারণ্য",
        sanctuaryDesc_en: data.sanctuaryDesc_en || "",
        sanctuaryDesc_bn: data.sanctuaryDesc_bn || "",
        dailyTime_en: data.dailyTime_en || "12:45 PM",
        dailyTime_bn: data.dailyTime_bn || "দুপুর ১২:৪৫",
        imageUrl: data.imageUrl || "",

        templeInfos: Array.isArray(data.templeInfos) ? data.templeInfos : [],
        milestones: Array.isArray(data.milestones) ? data.milestones : []
    };

    const handleChange = (field, value) => {
        onChange({ ...historyData, [field]: value });
    };

    // Temple Info Card handlers
    const handleTempleInfoChange = (index, field, value) => {
        const updatedInfos = [...historyData.templeInfos];
        updatedInfos[index] = { ...updatedInfos[index], [field]: value };
        onChange({ ...historyData, templeInfos: updatedInfos });
    };

    const handleSaveNewTempleInfo = (newInfo) => {
        onChange({
            ...historyData,
            templeInfos: [...historyData.templeInfos, newInfo]
        });
    };

    const handleRemoveTempleInfo = (index) => {
        const updatedInfos = historyData.templeInfos.filter((_, i) => i !== index);
        onChange({ ...historyData, templeInfos: updatedInfos });
    };

    // Milestone handlers
    const handleMilestoneChange = (index, field, value) => {
        const updatedMilestones = [...historyData.milestones];
        updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
        onChange({ ...historyData, milestones: updatedMilestones });
    };

    const handleSaveNewMilestone = (newMilestone) => {
        onChange({
            ...historyData,
            milestones: [...historyData.milestones, { ...newMilestone, order: historyData.milestones.length }]
        });
    };

    const handleRemoveMilestone = (index) => {
        const updatedMilestones = historyData.milestones.filter((_, i) => i !== index);
        onChange({ ...historyData, milestones: updatedMilestones });
    };

    const handleMoveMilestone = (index, direction) => {
        const newMilestones = [...historyData.milestones];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newMilestones.length) return;
        const temp = newMilestones[index];
        newMilestones[index] = newMilestones[targetIndex];
        newMilestones[targetIndex] = temp;
        onChange({ ...historyData, milestones: newMilestones });
    };

    const inputClass = "w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500";
    const labelClass = "block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1";

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-amber-100">History Page Settings</h3>
                <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">Manage history banner, location/sanctuary section, temple info cards, and historical milestones.</p>
            </div>

            {/* 1. Page Title & Desc */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">1. History Page Title & Banner Description</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Top Badge / Tag (English)</label>
                        <input type="text" value={historyData.pageTitle_en} onChange={(e) => handleChange("pageTitle_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Top Badge / Tag (বাংলা)</label>
                        <input type="text" value={historyData.pageTitle_bn} onChange={(e) => handleChange("pageTitle_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Main Heading (English)</label>
                        <input type="text" value={historyData.pageSubtitle_en} onChange={(e) => handleChange("pageSubtitle_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Main Heading (বাংলা)</label>
                        <input type="text" value={historyData.pageSubtitle_bn} onChange={(e) => handleChange("pageSubtitle_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Subtitle Description (English)</label>
                        <textarea rows={2} value={historyData.description_en} onChange={(e) => handleChange("description_en", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Subtitle Description (বাংলা)</label>
                        <textarea rows={2} value={historyData.description_bn} onChange={(e) => handleChange("description_bn", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                </div>
            </div>

            {/* 2. Location & Sanctuary Section */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">2. Location & Sanctuary Section</h4>
                <div>
                    <label className={labelClass}>Featured Sanctuary Image URL (Left side arch image)</label>
                    <input type="url" value={historyData.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)} placeholder="https://i.ibb.co.com/.../temple1.jpg" className={`${inputClass} font-mono`} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Location Badge (EN)</label>
                        <input type="text" value={historyData.sanctuaryBadge_en} onChange={(e) => handleChange("sanctuaryBadge_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Location Badge (BN)</label>
                        <input type="text" value={historyData.sanctuaryBadge_bn} onChange={(e) => handleChange("sanctuaryBadge_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Section Title (English)</label>
                        <input type="text" value={historyData.sanctuaryTitle_en} onChange={(e) => handleChange("sanctuaryTitle_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Section Title (বাংলা)</label>
                        <input type="text" value={historyData.sanctuaryTitle_bn} onChange={(e) => handleChange("sanctuaryTitle_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Sanctuary Description (English)</label>
                        <textarea rows={3} value={historyData.sanctuaryDesc_en} onChange={(e) => handleChange("sanctuaryDesc_en", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Sanctuary Description (বাংলা)</label>
                        <textarea rows={3} value={historyData.sanctuaryDesc_bn} onChange={(e) => handleChange("sanctuaryDesc_bn", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Daily Worship Time (EN)</label>
                        <input type="text" value={historyData.dailyTime_en} onChange={(e) => handleChange("dailyTime_en", e.target.value)} placeholder="12:45 PM" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Daily Worship Time (BN)</label>
                        <input type="text" value={historyData.dailyTime_bn} onChange={(e) => handleChange("dailyTime_bn", e.target.value)} placeholder="দুপুর ১২:৪৫" className={inputClass} />
                    </div>
                </div>
            </div>

            {/* 3. Temple Info Section */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">3. Temple Info / Quick Facts Bar</h4>
                        <p className="text-[11px] text-stone-500 dark:text-cream-200/70">Manage the highlight info boxes (e.g., Temple Entry, Photography, Puja times).</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsInfoModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" /> Add Info Box
                    </button>
                </div>

                <div className="space-y-3">
                    {historyData.templeInfos.map((info, index) => (
                        <div key={index} className="bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/25 rounded-2xl p-4 space-y-3 relative">
                            <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-amber-500/15">
                                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Info Box #{index + 1}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTempleInfo(index)}
                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-600 hover:text-white transition cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Title (English)</label>
                                    <input type="text" value={info.title_en} onChange={(e) => handleTempleInfoChange(index, "title_en", e.target.value)} placeholder="Temple Entry" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Title (বাংলা)</label>
                                    <input type="text" value={info.title_bn} onChange={(e) => handleTempleInfoChange(index, "title_bn", e.target.value)} placeholder="মন্দির প্রবেশ" className={inputClass} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Description (English)</label>
                                    <input type="text" value={info.description_en} onChange={(e) => handleTempleInfoChange(index, "description_en", e.target.value)} placeholder="Free entry for all devotees..." className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Description (বাংলা)</label>
                                    <input type="text" value={info.description_bn} onChange={(e) => handleTempleInfoChange(index, "description_bn", e.target.value)} placeholder="সকল ভক্তদের জন্য উন্মুক্ত..." className={inputClass} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Historical Milestone Section */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">4. Historical Milestones & Festivals Builder</h4>
                        <p className="text-[11px] text-stone-500 dark:text-cream-200/70">Create, reorder, or customize historical milestone cards.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMilestoneModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" /> Add New Milestone
                    </button>
                </div>

                {historyData.milestones.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-stone-200 dark:border-amber-500/20 rounded-2xl text-xs text-stone-400">
                        No milestone cards added yet. Click 'Add New Milestone' to create one.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {historyData.milestones.map((milestone, index) => (
                            <div key={index} className="bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/25 rounded-2xl p-4 space-y-3 relative shadow-2xs">
                                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-amber-500/15">
                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                        <Sparkles className="w-3.5 h-3.5" /> Milestone Card #{index + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button type="button" disabled={index === 0} onClick={() => handleMoveMilestone(index, "up")} className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-cream-200 disabled:opacity-30 cursor-pointer" title="Move Up">
                                            <ArrowUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button type="button" disabled={index === historyData.milestones.length - 1} onClick={() => handleMoveMilestone(index, "down")} className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-cream-200 disabled:opacity-30 cursor-pointer" title="Move Down">
                                            <ArrowDown className="w-3.5 h-3.5" />
                                        </button>
                                        <button type="button" onClick={() => handleRemoveMilestone(index)} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-600 hover:text-white transition cursor-pointer ml-2" title="Delete Milestone">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className={labelClass}>Select Icon</label>
                                        <select value={milestone.icon || "Calendar"} onChange={(e) => handleMilestoneChange(index, "icon", e.target.value)} className={inputClass}>
                                            {AVAILABLE_ICONS.map((iconName) => (
                                                <option key={iconName} value={iconName}>{iconName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Badge / Tag (EN)</label>
                                        <input type="text" value={milestone.badge_en || ""} onChange={(e) => handleMilestoneChange(index, "badge_en", e.target.value)} placeholder="38th Edition" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Badge / Tag (বাংলা)</label>
                                        <input type="text" value={milestone.badge_bn || ""} onChange={(e) => handleMilestoneChange(index, "badge_bn", e.target.value)} placeholder="৩৮তম সংস্করণ" className={inputClass} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Title (English) *</label>
                                        <input type="text" value={milestone.title_en || ""} onChange={(e) => handleMilestoneChange(index, "title_en", e.target.value)} placeholder="JANUARY 2025 FESTIVAL" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Title (বাংলা)</label>
                                        <input type="text" value={milestone.title_bn || ""} onChange={(e) => handleMilestoneChange(index, "title_bn", e.target.value)} placeholder="জানুয়ারি ২০২৫ উৎসব" className={inputClass} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Description (English)</label>
                                        <textarea rows={2} value={milestone.description_en || ""} onChange={(e) => handleMilestoneChange(index, "description_en", e.target.value)} placeholder="Milestone description..." className={`${inputClass} resize-none`} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Description (বাংলা)</label>
                                        <textarea rows={2} value={milestone.description_bn || ""} onChange={(e) => handleMilestoneChange(index, "description_bn", e.target.value)} placeholder="বাংলায় বিবরণ..." className={`${inputClass} resize-none`} />
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

            <HistoryMilestoneModal
                isOpen={isMilestoneModalOpen}
                onClose={() => setIsMilestoneModalOpen(false)}
                onSaveMilestone={handleSaveNewMilestone}
                inputClass={inputClass}
                labelClass={labelClass}
            />

            <HistoryTempleInfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                onSaveInfo={handleSaveNewTempleInfo}
                inputClass={inputClass}
                labelClass={labelClass}
            />
        </div>
    );
}