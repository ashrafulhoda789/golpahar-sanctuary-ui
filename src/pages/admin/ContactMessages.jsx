/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { fetchContactMessages } from '../../lib/api/contact';
import { deleteContactMessage, replyContactMessage, markContactAsRead } from '../../lib/actions/contact';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../locales/translations';
import ContactMessageList from '../../components/admin/contacts/ContactMessageList';
import MessageReplyPanel from '../../components/admin/contacts/MessageReplyPanel';
import DeleteConfirmModal from '../../components/admin/contacts/DeleteConfirmModal';

export default function AdminContactMessages() {
    const { lang } = useLanguage();
    const t = translations?.[lang]?.adminContact || translations?.en?.adminContact || {
        title: "Contact Messages",
        subtitle: "Manage and review inquiries submitted by users through the contact form.",
        refresh: "Refresh"
    };

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [replyLoading, setReplyLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [deleteModalId, setDeleteModalId] = useState(null);
    const [filterTab, setFilterTab] = useState('All');

    const loadMessages = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetchContactMessages();
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

    const handleSelectMessage = async (msg) => {
        setSelectedMessage(msg);
        setReplyText(msg.replyMessage || '');

        if (msg?.status === 'new' || msg?.status === 'unread') {
            try {
                const res = await markContactAsRead(msg.id);
                if (res && res.success) {
                    setMessages((prev) =>
                        prev.map((item) => (item.id === msg.id ? res.data : item))
                    );
                    setSelectedMessage(res.data);
                }
            } catch (err) {
                console.error("Failed to mark as read:", err);
            }
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!selectedMessage || !replyText.trim()) return;

        setReplyLoading(true);
        setError('');
        try {
            const res = await replyContactMessage(selectedMessage.id, replyText);
            if (res && res.success) {
                const updatedMessages = messages.map((msg) =>
                    msg.id === selectedMessage.id ? res.data : msg
                );
                setMessages(updatedMessages);
                setSelectedMessage(res.data);
            } else {
                setError(res.message || 'Failed to send reply.');
            }
        } catch (err) {
            console.error(err);
            setError('Error sending reply.');
        } finally {
            setReplyLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModalId) return;

        setActionLoading(deleteModalId);
        try {
            const res = await deleteContactMessage(deleteModalId);
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

    const filteredMessages = messages.filter((msg) => {
        if (filterTab === 'New') return msg.status === 'new';
        if (filterTab === 'Unread') return msg.status === 'unread';
        if (filterTab === 'Read') return msg.status === 'read';
        if (filterTab === 'Replied') return msg.status === 'replied';
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 p-4 rounded-3xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-stone-900 dark:text-amber-100">
                        {t.title}
                    </h1>
                    <p className="text-xs text-stone-500 dark:text-cream-200/70 mt-1">
                        {t.subtitle}
                    </p>
                </div>
                <button
                    onClick={loadMessages}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    {t.refresh}
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
                    <ContactMessageList
                        messages={filteredMessages}
                        allCount={messages.length}
                        loading={loading}
                        selectedMessage={selectedMessage}
                        onSelectMessage={handleSelectMessage}
                        onCloseSelected={() => setSelectedMessage(null)}
                        onDeleteClick={(id) => setDeleteModalId(id)}
                        actionLoading={actionLoading}
                        replyText={replyText}
                        setReplyText={setReplyText}
                        replyLoading={replyLoading}
                        onReplySubmit={handleReplySubmit}
                        filterTab={filterTab}
                        setFilterTab={setFilterTab}
                    />
                </div>

                {selectedMessage && (
                    <div className="hidden lg:block lg:col-span-5">
                        <MessageReplyPanel
                            message={selectedMessage}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            replyLoading={replyLoading}
                            onReplySubmit={handleReplySubmit}
                            onDeleteClick={(id) => setDeleteModalId(id)}
                            onClose={() => setSelectedMessage(null)}
                        />
                    </div>
                )}
            </div>

            <DeleteConfirmModal
                isOpen={Boolean(deleteModalId)}
                onClose={() => setDeleteModalId(null)}
                onConfirm={handleDeleteConfirm}
                isDeleting={actionLoading === deleteModalId}
            />
        </div>
    );
}