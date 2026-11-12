export default function BannerForm({ data, onChange }) {

    const isEnglishTitlePresent = Boolean(data?.title_en && data.title_en.trim() !== "");
    const isEnglishDescPresent = Boolean(data?.description_en && data.description_en.trim() !== "");

    const imagesList = data?.images || [];

    const handleImageChange = (index, field, value) => {
        const updatedImages = [...imagesList];
        updatedImages[index] = { ...updatedImages[index], [field]: value };
        onChange({ ...data, images: updatedImages });
    };

    const addImageField = () => {
        onChange({
            ...data,
            images: [...imagesList, { url: "", caption_en: "", caption_bn: "" }]
        });
    };

    const removeImageField = (index) => {
        const updatedImages = imagesList.filter((_, i) => i !== index);
        onChange({ ...data, images: updatedImages });
    };

    const handleMove = (index, direction) => {
        const updatedImages = [...imagesList];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= updatedImages.length) return;

        const temp = updatedImages[index];
        updatedImages[index] = updatedImages[targetIndex];
        updatedImages[targetIndex] = temp;

        onChange({ ...data, images: updatedImages });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-sm font-bold text-stone-800 dark:text-amber-100 uppercase tracking-wide">Hero Banner</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                        Banner Title (English)
                    </label>
                    <input
                        type="text"
                        value={data?.title_en || ""}
                        onChange={(e) => onChange({ ...data, title_en: e.target.value })}
                        placeholder="e.g. Golpahar Mohashoshan Kali Mandir"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                        Banner Title (বাংলা) {isEnglishTitlePresent && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="text"
                        required={isEnglishTitlePresent}
                        value={data?.title_bn || ""}
                        onChange={(e) => onChange({ ...data, title_bn: e.target.value })}
                        placeholder="যেমন: গোলপাহাড় মহাশ্মশান কালী মন্দির"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>

                <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                        Banner Description (English)
                    </label>
                    <textarea
                        rows={3}
                        value={data?.description_en || ""}
                        onChange={(e) => onChange({ ...data, description_en: e.target.value })}
                        placeholder="Enter English description..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-stone-600 dark:text-amber-200/80 mb-1">
                        Banner Description (বাংলা) {isEnglishDescPresent && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                        rows={3}
                        required={isEnglishDescPresent}
                        value={data?.description_bn || ""}
                        onChange={(e) => onChange({ ...data, description_bn: e.target.value })}
                        placeholder="বাংলা বিবরণ লিখুন..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                </div>

            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-xs font-bold text-stone-800 dark:text-amber-100 uppercase tracking-wide">
                            Hero Slider Images (URLs)
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-amber-200/60">
                            Add image links and captions for the banner background slider.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={addImageField}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors cursor-pointer shadow-md"
                    >
                        + Add Image URL
                    </button>
                </div>

                {imagesList.length === 0 ? (
                    <p className="text-xs italic text-stone-500 dark:text-amber-200/50">
                        No custom slider images added yet. Default images will be used.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {imagesList.map((img, index) => (
                            <div
                                key={index}
                                className="p-3.5 rounded-xl bg-stone-100 dark:bg-[#1f0509] border border-stone-200 dark:border-amber-500/30 space-y-3 relative shadow-sm"
                            >
                                <div className="flex justify-between items-center border-b border-stone-200 dark:border-amber-500/20 pb-2">
                                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-300">
                                        Image Item #{index + 1}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            disabled={index === 0}
                                            onClick={() => handleMove(index, 'up')}
                                            className="px-2.5 py-1 text-[11px] font-semibold bg-stone-200 dark:bg-[#2d080d] text-stone-700 dark:text-cream-100 rounded-md disabled:opacity-30 cursor-pointer transition-colors border border-stone-300 dark:border-amber-500/20"
                                            title="Move Up"
                                        >
                                            ↑ Move Up
                                        </button>
                                        <button
                                            type="button"
                                            disabled={index === imagesList.length - 1}
                                            onClick={() => handleMove(index, 'down')}
                                            className="px-2.5 py-1 text-[11px] font-semibold bg-stone-200 dark:bg-[#2d080d] text-stone-700 dark:text-cream-100 rounded-md disabled:opacity-30 cursor-pointer transition-colors border border-stone-300 dark:border-amber-500/20"
                                            title="Move Down"
                                        >
                                            ↓ Move Down
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="md:col-span-3">
                                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-0.5">
                                            Image URL #{index + 1}
                                        </label>
                                        <input
                                            type="url"
                                            value={img.url || ""}
                                            onChange={(e) => handleImageChange(index, "url", e.target.value)}
                                            placeholder="https://i.ibb.co.com/.../image.jpg"
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-0.5">
                                            Caption (English)
                                        </label>
                                        <input
                                            type="text"
                                            value={img.caption_en || ""}
                                            onChange={(e) => handleImageChange(index, "caption_en", e.target.value)}
                                            placeholder="e.g. Temple View"
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-amber-200/80 mb-0.5">
                                            Caption (বাংলা)
                                        </label>
                                        <input
                                            type="text"
                                            value={img.caption_bn || ""}
                                            onChange={(e) => handleImageChange(index, "caption_bn", e.target.value)}
                                            placeholder="যেমন: মন্দির প্রাঙ্গণ"
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 placeholder-stone-400 dark:placeholder-cream-200/30 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <div className="flex items-end justify-end md:justify-start">
                                        <button
                                            type="button"
                                            onClick={() => removeImageField(index)}
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 transition-colors cursor-pointer w-full md:w-auto"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}