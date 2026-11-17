import { Fragment } from "react";
import {
  Mail,
  Phone,
  Trash2,
  Eye,
  CheckCircle,
  Sparkles,
  Clock,
  BookOpen,
} from "lucide-react";
import MessageReplyPanel from "./MessageReplyPanel";

export default function ContactMessageList({
  messages,
  loading,
  selectedMessage,
  onSelectMessage,
  onCloseSelected,
  onDeleteClick,
  actionLoading,
  replyText,
  setReplyText,
  replyLoading,
  onReplySubmit,
  filterTab,
  setFilterTab,
}) {
  const tabs = ["All", "New", "Unread", "Read", "Replied"];

  const getStatusBadge = (status) => {
    const currentStatus = status ? status.toLowerCase() : "new";

    if (currentStatus === "replied") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-3 h-3" /> Replied
        </span>
      );
    }
    if (currentStatus === "read") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400">
          <BookOpen className="w-3 h-3" /> Read
        </span>
      );
    }
    if (currentStatus === "unread") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
          <Clock className="w-3 h-3" /> Unread
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-400">
        <Sparkles className="w-3 h-3" /> New
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-[#1a0408] border border-stone-200 dark:border-amber-500/25 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-4 sm:p-6 border-b border-stone-100 dark:border-amber-500/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-sm font-bold text-stone-800 dark:text-amber-200">
          All Inquiries ({messages?.length || 0})
        </h3>

        <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 dark:bg-stone-900/60 p-1 rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                filterTab === tab
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-cream-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-stone-500 dark:text-stone-400">
          Loading messages...
        </div>
      ) : !messages || messages.length === 0 ? (
        <div className="p-12 text-center space-y-2">
          <Mail className="w-8 h-8 mx-auto text-stone-400" />
          <p className="text-xs text-stone-500 dark:text-stone-400">
            No messages found in this filter.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-900/50 text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase">
                  <th className="p-4">Sender</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-amber-500/10 text-xs">
                {messages.map((msg) => {
                  const isUnreadOrNew =
                    msg.status === "new" || msg.status === "unread";
                  const isSelected = selectedMessage?.id === msg.id;

                  return (
                    <tr
                      key={msg.id}
                      className={`transition cursor-pointer ${
                        isSelected
                          ? "bg-amber-100/60 dark:bg-amber-950/50"
                          : isUnreadOrNew
                            ? "bg-amber-50/70 dark:bg-amber-950/25 font-medium"
                            : "hover:bg-stone-50 dark:hover:bg-stone-900/30"
                      }`}
                      onClick={() => onSelectMessage(msg)}
                    >
                      <td className="p-4 relative max-w-[250px] sm:max-w-xs">
                          {isUnreadOrNew && (
                              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                          )}
                          <span className="font-bold text-stone-900 dark:text-amber-100 block pl-2 truncate">
                              {msg.name}
                          </span>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 pl-2 line-clamp-1 break-all">
                              {msg.message}
                          </p>
                      </td>
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-stone-600 dark:text-cream-200/80">
                          <Mail className="w-3.5 h-3.5 text-amber-600" />
                          <span>{msg.email || "N/A"}</span>
                        </div>
                        {msg.phone && (
                          <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                            <Phone className="w-3 h-3 text-amber-600" />
                            <span>{msg.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4">{getStatusBadge(msg.status)}</td>
                      <td className="p-4 text-stone-500 dark:text-stone-400 whitespace-nowrap">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td
                        className="p-4 text-right space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectMessage(msg)}
                          className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-200 hover:bg-amber-600 hover:text-white transition cursor-pointer"
                          title="View & Reply"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteClick(msg.id)}
                          disabled={actionLoading === msg.id}
                          className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden divide-y divide-stone-100 dark:divide-amber-500/10">
            {messages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              const isUnreadOrNew =
                msg?.status === "new" || msg?.status === "unread";

              return (
                <Fragment key={msg.id}>
                  <div
                    onClick={() =>
                      isSelected ? onCloseSelected() : onSelectMessage(msg)
                    }
                    className={`p-4 space-y-2.5 transition cursor-pointer relative ${
                      isSelected
                        ? "bg-amber-100/60 dark:bg-amber-950/50"
                        : isUnreadOrNew
                          ? "bg-amber-50/80 dark:bg-amber-950/30 border-l-4 border-amber-600"
                          : "hover:bg-stone-50 dark:hover:bg-stone-900/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-amber-100 flex items-center gap-1.5">
                          {isUnreadOrNew && (
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                          )}
                          {msg.name}
                        </h4>
                        <span className="text-[10px] text-stone-400">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(msg.status)}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteClick(msg.id);
                          }}
                          disabled={actionLoading === msg.id}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      {msg.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 dark:text-stone-400 pt-0.5">
                      {msg.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-amber-600" />{" "}
                          {msg.email}
                        </span>
                      )}
                      {msg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-amber-600" />{" "}
                          {msg.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <MessageReplyPanel
                      message={selectedMessage}
                      replyText={replyText}
                      setReplyText={setReplyText}
                      replyLoading={replyLoading}
                      onReplySubmit={onReplySubmit}
                      onDeleteClick={onDeleteClick}
                      onClose={onCloseSelected}
                      isMobile={true}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
