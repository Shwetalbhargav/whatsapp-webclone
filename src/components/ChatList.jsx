import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { MessageSquarePlus, MoreVertical } from 'lucide-react';

export default function ChatList() {
  const [conversations, setConversations] = useState({});

  useEffect(() => {
    api.get('/messages').then(res => {
      // group by waId
      const groups = res.data.reduce((acc, msg) => {
        acc[msg.waId] = acc[msg.waId] || [];
        acc[msg.waId].push(msg);
        return acc;
      }, {});
      setConversations(groups);
    });
  }, []);

 
    return (
   <div className="d-flex flex-column h-100 border-end">
      {/* Top bar */}
      <div className="d-flex align-items-center justify-content-between p-2 border-bottom">
        <h5 className="mb-0">WhatsApp</h5>
        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-light me-2">
            <MessageSquarePlus size={18} />
          </button>
          <button className="btn btn-sm btn-light">
            <MoreVertical size={18} />
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
        {['All','Unread','Favourites','Groups'].map(tab => (
          <button
            key={tab}
            className="btn btn-sm btn-outline-secondary me-1"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-grow-1 overflow-auto">
        <ul className="list-group list-group-flush">
          {Object.entries(conversations).map(([waId, msgs]) => (
            <Link
              key={waId}
              to={`/chat/${waId}`}
              className="list-group-item list-group-item-action d-flex align-items-center"
            >
              <div className="flex-grow-1">
                <div className="fw-semibold">{msgs[0].from}</div>
                <div className="small text-muted">{waId}</div>
              </div>
              {/* placeholder for unread badge */}
              <span className="badge bg-success rounded-pill">2</span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
 }

