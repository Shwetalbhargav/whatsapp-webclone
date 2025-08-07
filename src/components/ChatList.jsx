import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoAddCircleOutline,
  IoEllipsisVertical
} from 'react-icons/io5';
import useConversations from '../hooks/useConversations';

const formatTime = ts =>
  new Date(ts).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit'
  });

export default function ChatList() {
  const { conversations, loading, error } = useConversations();
  const [filter, setFilter] = useState('All');

  const filtered = conversations.filter(conv => {
    if (filter === 'Unread')     return conv.unreadCount > 0;
    if (filter === 'Favourites') return conv.isFavourite;
    if (filter === 'Groups')     return conv.isGroup;
    return true;
  });

  if (loading) return <div className="p-3">Loading chats…</div>;
  if (error)   return <div className="p-3 text-danger">Failed to load chats</div>;

  return (
    <div className="d-flex flex-column h-100 border-end">
      {/* Top bar */}
      <div className="d-flex align-items-center justify-content-between p-2 border-bottom">
        <h5 className="mb-0">WhatsApp</h5>
        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-light me-2">
            <IoAddCircleOutline size={18} />
          </button>
          <button className="btn btn-sm btn-light">
            <IoEllipsisVertical size={18} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search or start new chat"
        />
      </div>

      {/* Tabs */}
      <div className="px-2 mb-2">
        {['All', 'Unread', 'Favourites', 'Groups'].map(tab => (
          <button
            key={tab}
            className={`btn btn-sm me-1 ${
              filter === tab ? 'btn-primary' : 'btn-outline-secondary'
            }`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conversation List */}
      <div className="flex-grow-1 overflow-auto">
        <ul className="list-group list-group-flush">
          {filtered.map(conv => (
            <Link
              key={conv.waId}
              to={`/chat/${conv.waId}`}
              className="list-group-item list-group-item-action d-flex align-items-center"
            >
              <div className="flex-grow-1">
                <div className="fw-semibold">
                  {conv.name || conv.number}
                </div>
                <div className="small text-muted">
                  {conv.lastMessage.snippet}
                </div>
              </div>
              <div className="text-end">
                <div className="small text-muted">
                  {formatTime(conv.lastMessage.timestamp)}
                </div>
                {conv.unreadCount > 0 && (
                  <span className="badge bg-success rounded-pill">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
