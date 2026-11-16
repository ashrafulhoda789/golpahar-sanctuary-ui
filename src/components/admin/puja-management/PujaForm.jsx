import { Loader2, Trash2, Save } from 'lucide-react';

export default function PujaForm({ formData, setFormData, onSubmit, onDelete, isEditing, saving }) {
    const isEnglishTitlePresent = Boolean(formData?.title_en && formData.title_en.trim() !== "");

    return (
        <form onSubmit={onSubmit} className="space-y-6 pt-4 border-t border-stone-100 dark:border-amber-500/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-100 dark:border-amber-500/15">
                <div>
                    <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded bg-amber-600 text-white mb-2">
                        {isEditing ? 'Edit Mode' : 'Creation Mode'}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-amber-100">
                        {isEditing ? `Editing: ${formData.title_en || ''}` : 'Add New Puja Details'}
                    </h3>
                </div>
                {isEditing && (
                    <button
                        type="button"
                        onClick={onDelete}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-red-500/10 hover:bg-red-600 text-red-600 hover:text-white transition cursor-pointer shadow-2xs self-start sm:self-auto"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Puja
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                        Puja Title (English) *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title_en || ''}
                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                        placeholder="e.g. Special Kali Puja"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                        Puja Title (বাংলা) {isEnglishTitlePresent && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="text"
                        required={isEnglishTitlePresent}
                        value={formData.title_bn || ''}
                        onChange={(e) => setFormData({ ...formData, title_bn: e.target.value })}
                        placeholder="যেমন: বিশেষ কালী পূজা"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">
                        Price (BDT) *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="500"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Date (English)</label>
                    <input
                        type="text"
                        value={formData.date_en || ''}
                        onChange={(e) => setFormData({ ...formData, date_en: e.target.value })}
                        placeholder="e.g. 15 Nov 2026"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Date (বাংলা)</label>
                    <input
                        type="text"
                        value={formData.date_bn || ''}
                        onChange={(e) => setFormData({ ...formData, date_bn: e.target.value })}
                        placeholder="যেমন: ১৫ নভেম্বর ২০২৬"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Time</label>
                    <input
                        type="text"
                        value={formData.time || ''}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        placeholder="e.g. 07:00 PM"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Event Type (English)</label>
                    <input
                        type="text"
                        value={formData.type_en || ''}
                        onChange={(e) => setFormData({ ...formData, type_en: e.target.value })}
                        placeholder="e.g. Annual Festival"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Event Type (বাংলা)</label>
                    <input
                        type="text"
                        value={formData.type_bn || ''}
                        onChange={(e) => setFormData({ ...formData, type_bn: e.target.value })}
                        placeholder="যেমন: বার্ষিক উৎসব"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Location (English)</label>
                    <input
                        type="text"
                        value={formData.location_en || ''}
                        onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
                        placeholder="e.g. Main Temple Premises"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Location (বাংলা)</label>
                    <input
                        type="text"
                        value={formData.location_bn || ''}
                        onChange={(e) => setFormData({ ...formData, location_bn: e.target.value })}
                        placeholder="যেমন: মূল মন্দির প্রাঙ্গণ"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Image URL</label>
                    <input
                        type="url"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://i.ibb.co.com/..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Description (English)</label>
                    <textarea
                        rows={3}
                        value={formData.description_en || ''}
                        onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                        placeholder="Enter English description..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Description (বাংলা)</label>
                    <textarea
                        rows={3}
                        value={formData.description_bn || ''}
                        onChange={(e) => setFormData({ ...formData, description_bn: e.target.value })}
                        placeholder="বাংলা বিবরণ লিখুন..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Rules (English)</label>
                    <textarea
                        rows={2}
                        value={formData.rules_en || ''}
                        onChange={(e) => setFormData({ ...formData, rules_en: e.target.value })}
                        placeholder="Enter rules or instructions in English..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-stone-700 dark:text-amber-200 mb-1">Rules (বাংলা)</label>
                    <textarea
                        rows={2}
                        value={formData.rules_bn || ''}
                        onChange={(e) => setFormData({ ...formData, rules_bn: e.target.value })}
                        placeholder="বাংলায় নিয়মাবলী বা নির্দেশিকা লিখুন..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-stone-100 dark:border-amber-500/15 gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isAvailable"
                        checked={formData.isAvailable ?? true}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                        className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <label htmlFor="isAvailable" className="text-xs font-bold text-stone-700 dark:text-amber-200 cursor-pointer">
                        Available for Booking
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEditing ? 'Update Puja' : 'Save Puja'}
                </button>
            </div>
        </form>
    );
}