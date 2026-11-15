/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Mail, Phone, Trash2, Eye, RefreshCw, AlertCircle, AlertTriangle } from 'lucide-react';
import { fetchContactMessages } from '../../lib/api/contact';
import { deleteContactMessage } from '../../lib/actions/contact';

export default function AdminContactMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null); 
    const [actionLoading, setActionLoading] = useState(null);
    const [deleteModalId, setDeleteModalId] = useState(null);

    const loadMessages = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token'); 
            const res = await fetchContactMessages(token);
            if (res && res.success) {
                setMessages(res.data || []);
            } else {
                setError(res.message || 'Failed to load contact messages.');
            }
        } catch (err) {
            console.error(err);
            setError('Network error while fetching messages.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const handleDeleteConfirm = async () => {
        if (!deleteModalId) return;

        setActionLoading(deleteModalId);
        try {
            const token = localStorage.getItem('token');
            const res = await deleteContactMessage(deleteModalId, token);
            if (res && res.success) {
                setMessages(messages.filter((msg) => msg.id !== deleteModalId));
                if (selectedMessage?.id === deleteModalId) setSelectedMessage(null);
                setDeleteModalId(null);
            } else {
                setError(res.message || 'Failed to delete message.');
            }
        } catch (err) {
            console.error(err);
            setError('Error deleting message.');
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-6 rounded-3xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
                        Contact Messages
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
                        Manage and review inquiries submitted by users through the contact form.
                    </p>
                </div>
                <button
                    onClick={loadMessages}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className={`${selectedMessage ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all duration-300`}>
                    <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-4 sm:p-6 border-b border-stone-100 dark:border-amber-500/15 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-stone-800 dark:text-amber-200">
                                All Inquiries ({messages.length})
                            </h3>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-xs text-stone-500 dark:text-stone-400">
                                Loading messages...
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="p-12 text-center space-y-2">
                                <Mail className="w-8 h-8 mx-auto text-stone-400" />
                                <p className="text-xs text-stone-500 dark:text-stone-400">No messages found.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-stone-100 dark:divide-amber-500/10 overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-stone-50 dark:bg-stone-900/50 text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase">
                                            <th className="p-4">Sender</th>
                                            <th className="p-4">Contact Info</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100 dark:divide-amber-500/10 text-xs">
                                        {messages.map((msg) => (
                                            <tr 
                                                key={msg.id} 
                                                className={`hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition cursor-pointer ${selectedMessage?.id === msg.id ? 'bg-amber-50 dark:bg-amber-950/40' : ''}`}
                                                onClick={() => setSelectedMessage(msg)}
                                            >
                                                <td className="p-4">
                                                    <span className="font-bold text-stone-900 dark:text-amber-100 block">
                                                        {msg.name}
                                                    </span>
                                                    <span className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                                                        {msg.message}
                                                    </span>
                                                </td>
                                                <td className="p-4 space-y-1">
                                                    <div className="flex items-center gap-1.5 text-stone-600 dark:text-cream-200/80">
                                                        <Mail className="w-3.5 h-3.5 text-amber-600" />
                                                        <span>{msg.email || 'N/A'}</span>
                                                    </div>
                                                    {msg.phone && (
                                                        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                                                            <Phone className="w-3 h-3 text-amber-600" />
                                                            <span>{msg.phone}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-4 text-stone-500 dark:text-stone-400 whitespace-nowrap">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        onClick={() => setSelectedMessage(msg)}
                                                        className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-200 hover:bg-amber-600 hover:text-white transition cursor-pointer"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteModalId(msg.id)}
                                                        disabled={actionLoading === msg.id}
                                                        className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {selectedMessage && (
                    <div className="lg:col-span-5">
                        <div className="bg-white dark:bg-[#1a0408] border-2 border-amber-500/40 rounded-3xl p-6 shadow-xl sticky top-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-stone-100 dark:border-amber-500/15 pb-4">
                                <h3 className="text-base font-bold font-serif text-stone-900 dark:text-amber-100">
                                    Message Details
                                </h3>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-amber-200 cursor-pointer font-bold"
                                >
                                    Close ✕
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Sender Name</span>
                                    <p className="text-sm font-bold text-stone-800 dark:text-amber-100">{selectedMessage.name}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Email</span>
                                        <p className="text-xs text-stone-700 dark:text-cream-200">{selectedMessage.email || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Phone</span>
                                        <p className="text-xs text-stone-700 dark:text-cream-200">{selectedMessage.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Received Date</span>
                                    <p className="text-xs text-stone-500 dark:text-stone-400">
                                        {new Date(selectedMessage.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1">Message Content</span>
                                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#23060b] border border-stone-200 dark:border-amber-500/20 text-xs text-stone-700 dark:text-cream-100 leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    onClick={() => setDeleteModalId(selectedMessage.id)}
                                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete Message
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {deleteModalId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-red-600">
                            <div className="p-3 rounded-2xl bg-red-500/10">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold font-serif text-stone-900 dark:text-amber-100">
                                    Delete Message
                                </h3>
                                <p className="text-xs text-stone-500 dark:text-stone-400">
                                    Are you sure you want to delete this inquiry?
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => setDeleteModalId(null)}
                                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-cream-200 text-xs font-bold transition cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={actionLoading === deleteModalId}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                            >
                                {actionLoading === deleteModalId ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}