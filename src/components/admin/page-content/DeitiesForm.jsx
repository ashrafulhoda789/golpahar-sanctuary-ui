import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Save, Loader2 } from "lucide-react";
import DeityItemModal from "./DeityItemModal";

export default function DeitiesForm({ data = {}, onChange, onSave, saving = false }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deitiesData = {
        pageTitle_en: data.pageTitle_en || "TEMPLE DEITIES & REVERED SAGES",
        pageTitle_bn: data.pageTitle_bn || "মন্দিরের দেবতা ও পূজনীয় সাধকগণ",
        description_en: data.description_en || "",
        description_bn: data.description_bn || "",
        presidingDeity: data.presidingDeity || {
            badge_en: "DIVINE SANCTUARY",
            badge_bn: "পবিত্র অভয়ারণ্য",
            name_en: "",
            name_bn: "",
            description_en: "",
            description_bn: "",
            imageUrl: "",
            dailyPuja_en: "",
            dailyPuja_bn: "",
            eveningArati_en: "",
            eveningArati_bn: "",
            majorFestivals_en: "",
            majorFestivals_bn: "",
            location_en: "",
            location_bn: "",
            shoeKeeping_en: "",
            shoeKeeping_bn: ""
        },
        items: Array.isArray(data.items) ? data.items : []
    };

    const handleChange = (field, value) => {
        onChange({ ...deitiesData, [field]: value });
    };

    const handlePresidingChange = (field, value) => {
        onChange({
            ...deitiesData,
            presidingDeity: {
                ...deitiesData.presidingDeity,
                [field]: value
            }
        });
    };

    const handleSaveNewDeity = (newDeity) => {
        onChange({
            ...deitiesData,
            items: [...deitiesData.items, { ...newDeity, order: deitiesData.items.length }]
        });
    };

    const handleDeityItemChange = (index, field, value) => {
        const updatedItems = [...deitiesData.items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        onChange({ ...deitiesData, items: updatedItems });
    };

    const handleRemoveDeity = (index) => {
        const updatedItems = deitiesData.items.filter((_, i) => i !== index);
        onChange({ ...deitiesData, items: updatedItems });
    };

    const handleMoveDeity = (index, direction) => {
        const newItems = [...deitiesData.items];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newItems.length) return;
        const temp = newItems[index];
        newItems[index] = newItems[targetIndex];
        newItems[targetIndex] = temp;
        onChange({ ...deitiesData, items: newItems });
    };

    const inputClass = "w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500";
    const labelClass = "block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1";

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-amber-100">Deities Page Settings</h3>
                <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">Manage page header, presiding deity details, quick overview, and list of other deities/sages.</p>
            </div>

            {/* 1. Page Title & Description */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">1. Deities Page Title & Description</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Page Title (English)</label>
                        <input type="text" value={deitiesData.pageTitle_en} onChange={(e) => handleChange("pageTitle_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Page Title (বাংলা)</label>
                        <input type="text" value={deitiesData.pageTitle_bn} onChange={(e) => handleChange("pageTitle_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Description (English)</label>
                        <textarea rows={2} value={deitiesData.description_en} onChange={(e) => handleChange("description_en", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Description (বাংলা)</label>
                        <textarea rows={2} value={deitiesData.description_bn} onChange={(e) => handleChange("description_bn", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                </div>
            </div>

            {/* 2. Presiding Deity Section */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">2. Presiding Deity Section</h4>
                
                <div>
                    <label className={labelClass}>Presiding Deity Image URL</label>
                    <input type="url" value={deitiesData.presidingDeity.imageUrl} onChange={(e) => handlePresidingChange("imageUrl", e.target.value)} placeholder="https://i.ibb.co.com/.../deity.jpg" className={`${inputClass} font-mono`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Badge / Tag (EN)</label>
                        <input type="text" value={deitiesData.presidingDeity.badge_en} onChange={(e) => handlePresidingChange("badge_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Badge / Tag (BN)</label>
                        <input type="text" value={deitiesData.presidingDeity.badge_bn} onChange={(e) => handlePresidingChange("badge_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Name (English)</label>
                        <input type="text" value={deitiesData.presidingDeity.name_en} onChange={(e) => handlePresidingChange("name_en", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Name (বাংলা)</label>
                        <input type="text" value={deitiesData.presidingDeity.name_bn} onChange={(e) => handlePresidingChange("name_bn", e.target.value)} className={inputClass} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Description (English)</label>
                        <textarea rows={3} value={deitiesData.presidingDeity.description_en} onChange={(e) => handlePresidingChange("description_en", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                    <div>
                        <label className={labelClass}>Description (বাংলা)</label>
                        <textarea rows={3} value={deitiesData.presidingDeity.description_bn} onChange={(e) => handlePresidingChange("description_bn", e.target.value)} className={`${inputClass} resize-none`} />
                    </div>
                </div>

                {/* Quick Overview Table Details */}
                <div className="p-4 bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/25 rounded-2xl space-y-3">
                    <h5 className="text-xs font-bold text-amber-600 dark:text-amber-400">Quick Overview Details</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Daily Puja (EN)</label>
                            <input type="text" value={deitiesData.presidingDeity.dailyPuja_en} onChange={(e) => handlePresidingChange("dailyPuja_en", e.target.value)} placeholder="12:45 PM" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Daily Puja (BN)</label>
                            <input type="text" value={deitiesData.presidingDeity.dailyPuja_bn} onChange={(e) => handlePresidingChange("dailyPuja_bn", e.target.value)} placeholder="দুপুর ১২:৪৫" className={inputClass} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Evening Arati (EN)</label>
                            <input type="text" value={deitiesData.presidingDeity.eveningArati_en} onChange={(e) => handlePresidingChange("eveningArati_en", e.target.value)} placeholder="Tuesdays & Saturdays" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Evening Arati (BN)</label>
                            <input type="text" value={deitiesData.presidingDeity.eveningArati_bn} onChange={(e) => handlePresidingChange("eveningArati_bn", e.target.value)} placeholder="মঙ্গলবার ও শনিবার" className={inputClass} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Major Festivals (EN)</label>
                            <input type="text" value={deitiesData.presidingDeity.majorFestivals_en} onChange={(e) => handlePresidingChange("majorFestivals_en", e.target.value)} placeholder="Kali Puja & Anniversary" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Major Festivals (BN)</label>
                            <input type="text" value={deitiesData.presidingDeity.majorFestivals_bn} onChange={(e) => handlePresidingChange("majorFestivals_bn", e.target.value)} placeholder="কালী পূজা ও বার্ষিক উৎসব" className={inputClass} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Location (EN)</label>
                            <input type="text" value={deitiesData.presidingDeity.location_en} onChange={(e) => handlePresidingChange("location_en", e.target.value)} placeholder="Golpahar Crematorium Premises" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Location (BN)</label>
                            <input type="text" value={deitiesData.presidingDeity.location_bn} onChange={(e) => handlePresidingChange("location_bn", e.target.value)} placeholder="গোলপাহাড় মহাশ্মশান প্রাঙ্গণ" className={inputClass} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Shoe Keeping (EN)</label>
                            <input type="text" value={deitiesData.presidingDeity.shoeKeeping_en} onChange={(e) => handlePresidingChange("shoeKeeping_en", e.target.value)} placeholder="Available" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Shoe Keeping (BN)</label>
                            <input type="text" value={deitiesData.presidingDeity.shoeKeeping_bn} onChange={(e) => handlePresidingChange("shoeKeeping_bn", e.target.value)} placeholder="উপলব্ধ আছে" className={inputClass} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Additional Deities & Sages Builder */}
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-amber-500/15">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">3. Additional Deities & Revered Sages</h4>
                        <p className="text-[11px] text-stone-500 dark:text-cream-200/70">Add and manage other deities or revered sages with image, description, and born-death dates.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
                    >
                        <Plus className="w-4 h-4" /> Add New Deity
                    </button>
                </div>

                {deitiesData.items.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-stone-200 dark:border-amber-500/20 rounded-2xl text-xs text-stone-400">
                        No additional deities or sages added yet. Click 'Add New Deity' to create one.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {deitiesData.items.map((deity, index) => (
                            <div key={index} className="bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/25 rounded-2xl p-4 space-y-3 relative shadow-2xs">
                                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-amber-500/15">
                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                        <Sparkles className="w-3.5 h-3.5" /> Deity / Sage #{index + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button type="button" disabled={index === 0} onClick={() => handleMoveDeity(index, "up")} className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-cream-200 disabled:opacity-30 cursor-pointer" title="Move Up">
                                            <ArrowUp className="w-3.5 h-3.5" />
                                        </button>
                                        <button type="button" disabled={index === deitiesData.items.length - 1} onClick={() => handleMoveDeity(index, "down")} className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-cream-200 disabled:opacity-30 cursor-pointer" title="Move Down">
                                            <ArrowDown className="w-3.5 h-3.5" />
                                        </button>
                                        <button type="button" onClick={() => handleRemoveDeity(index)} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-600 hover:text-white transition cursor-pointer ml-2" title="Delete Deity">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Name (English) *</label>
                                        <input type="text" value={deity.name_en || ""} onChange={(e) => handleDeityItemChange(index, "name_en", e.target.value)} placeholder="Deity Name" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Name (বাংলা)</label>
                                        <input type="text" value={deity.name_bn || ""} onChange={(e) => handleDeityItemChange(index, "name_bn", e.target.value)} placeholder="দেবতা বা সাধকের নাম" className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Image URL</label>
                                    <input type="url" value={deity.imageUrl || ""} onChange={(e) => handleDeityItemChange(index, "imageUrl", e.target.value)} placeholder="https://i.ibb.co.com/.../image.jpg" className={`${inputClass} font-mono`} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Born-Death / Era (EN)</label>
                                        <input type="text" value={deity.birthDeath_en || ""} onChange={(e) => handleDeityItemChange(index, "birthDeath_en", e.target.value)} placeholder="1920 - 1995" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Born-Death / Era (BN)</label>
                                        <input type="text" value={deity.birthDeath_bn || ""} onChange={(e) => handleDeityItemChange(index, "birthDeath_bn", e.target.value)} placeholder="১৯২০ - ১৯৯৫" className={inputClass} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Description (English)</label>
                                        <textarea rows={2} value={deity.description_en || ""} onChange={(e) => handleDeityItemChange(index, "description_en", e.target.value)} placeholder="Deity description..." className={`${inputClass} resize-none`} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Description (বাংলা)</label>
                                        <textarea rows={2} value={deity.description_bn || ""} onChange={(e) => handleDeityItemChange(index, "description_bn", e.target.value)} placeholder="বাংলায় বিবরণ..." className={`${inputClass} resize-none`} />
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

            <DeityItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSaveDeity={handleSaveNewDeity}
                inputClass={inputClass}
                labelClass={labelClass}
            />
        </div>
    );
}