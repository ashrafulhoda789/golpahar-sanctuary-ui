import { Trash2, Send } from 'lucide-react';

export default function MessageReplyPanel({
    message,
    replyText,
    setReplyText,
    replyLoading,
    onReplySubmit,
    onDeleteClick,
    onClose,
    isMobile = false
}) {
    if (!message) return null;

    return (
        <div
            className={`${isMobile
                    ? 'bg-amber-50/40 dark:bg-[#23060b] border-t border-amber-500/25 p-4 space-y-4'
                    : 'bg-white dark:bg-[#1a0408] border-2 border-amber-500/40 rounded-3xl p-6 shadow-xl sticky top-6 space-y-4'
                }`}
        >
            <div className="flex items-center justify-between border-b border-stone-200/70 dark:border-amber-500/15 pb-3">
                <h3 className="text-sm sm:text-base font-bold font-serif text-stone-900 dark:text-amber-100">
                    Message Details
                </h3>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-amber-200 cursor-pointer font-bold"
                >
                    Close ✕
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Sender Name</span>
                    <p className="text-sm font-bold text-stone-800 dark:text-amber-100">{message.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Email</span>
                        <p className="text-xs text-stone-700 dark:text-cream-200 break-all">{message.email || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Phone</span>
                        <p className="text-xs text-stone-700 dark:text-cream-200">{message.phone || 'Not provided'}</p>
                    </div>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Received Date</span>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                        {new Date(message.createdAt).toLocaleString()}
                    </p>
                </div>

                <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Message Content</span>
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/20 text-xs text-stone-700 dark:text-cream-100 leading-relaxed whitespace-pre-wrap">
                        {message.message}
                    </div>
                </div>

                <form onSubmit={onReplySubmit} className="pt-2 space-y-2 border-t border-stone-200/70 dark:border-amber-500/15">
                    <div className="flex items-center justify-between">
                        <span className="block text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                            Admin Reply
                        </span>
                        {message.repliedAt && (
                            <span className="text-[10px] text-stone-400">
                                Replied: {new Date(message.repliedAt).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    <textarea
                        rows={3}
                        required
                        placeholder="Write your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 text-xs rounded-2xl bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                    <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                            type="button"
                            onClick={() => onDeleteClick(message.id)}
                            className="px-3.5 py-2 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                        <button
                            type="submit"
                            disabled={replyLoading || !replyText.trim()}
                            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                        >
                            <Send className="w-3.5 h-3.5" />
                            {replyLoading ? 'Saving...' : message.status === 'replied' ? 'Update Reply' : 'Send Reply'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}