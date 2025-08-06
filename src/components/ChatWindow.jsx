import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import MessageBubble from './MessageBubble';
import SendMessageForm from './SendMessageForm';

export default function ChatWindow() {
  const { waId } = useParams();
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: '', waId });

  useEffect(() => {
    api.get('/messages').then(res => {
      const filtered = res.data.filter(m => m.waId === waId);
      setMessages(filtered.reverse()); // oldest first
      if (filtered.length) setUserInfo({ name: filtered[0].from, waId });
    });
  }, [waId]);

  const addMessage = msg => setMessages(prev => [...prev, msg]);

  return (
   <div className="d-flex flex-column h-100">
+      <header className="p-4 border-bottom">
        <div className="font-bold">{userInfo.name}</div>
        <div className="small text-muted">{userInfo.waId}</div>
      </header>
      <div className="flex-grow-1 p-4 overflow-auto">
        {messages.map(m => <MessageBubble key={m.msgId} message={m} />)}
      </div>
      <SendMessageForm waId={waId} onNew={addMessage} />
    </div>
  );
}