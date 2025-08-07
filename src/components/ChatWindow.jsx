import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import MessageBubble from './MessageBubble';
import SendMessageForm from './SendMessageForm';
import {
  IoArrowBackOutline,
  IoVideocamOutline,
  IoCallOutline,
  IoSearchOutline,
  IoEllipsisVertical
} from 'react-icons/io5';

export default function ChatWindow() {
  const { waId } = useParams();
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: '', waId });

  useEffect(() => {
    api.get('/messages').then(res => {
      const filtered = res.data.filter(m => m.waId === waId);
      setMessages(filtered.reverse()); // so oldest shows first
      if (filtered.length) {
        setUserInfo({ name: filtered[0].from, waId });
      }
    });
  }, [waId]);

  const addMessage = msg => setMessages(prev => [...prev, msg]);

  return (
    <div className="d-flex flex-column h-100">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-light me-2">
            <IoArrowBackOutline size={20} />
          </button>
          <img
            src={`https://ui-avatars.com/api/?name=${userInfo.name}`}
            alt="avatar"
            className="rounded-circle me-2"
            style={{ width: 40, height: 40 }}
          />
          <div>
            <div className="fw-semibold">{userInfo.name}</div>
            <div className="small text-muted">last seen today at 11:13 am</div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-light me-2">
            <IoVideocamOutline size={20} />
          </button>
          <button className="btn btn-sm btn-light me-2">
            <IoCallOutline size={20} />
          </button>
          <button className="btn btn-sm btn-light me-2">
            <IoSearchOutline size={20} />
          </button>
          <button className="btn btn-sm btn-light">
            <IoEllipsisVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow-1 p-3 overflow-auto">
        {messages.map(m => (
          <MessageBubble key={m.msgId} message={m} />
        ))}
      </div>

      {/* Input */}
      <SendMessageForm waId={waId} onNew={addMessage} />
    </div>
  );
}
