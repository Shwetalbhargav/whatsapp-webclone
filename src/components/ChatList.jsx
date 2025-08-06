import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

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
   <div className="p-4">
      <ul className="list-group">
        {Object.entries(conversations).map(([waId, msgs]) => (
          <Link
            key={waId}
            to={`/chat/${waId}`}
            className="list-group-item list-group-item-action"
          >
            <div className="fw-semibold">{msgs[0].from}</div>
            <div className="small text-muted">{waId}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
 }

