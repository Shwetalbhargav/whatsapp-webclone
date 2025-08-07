import React, { useState } from 'react';
import api from '../api';
import {
  IoAttachOutline,
  IoHappyOutline,
  IoMicOutline
} from 'react-icons/io5';

export default function SendMessageForm({ waId, onNew }) {
  const [body, setBody] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!body.trim()) return;
    const res = await api.post('/messages', {
      from: 'DemoUser',
      to: waId,
      body,
      type: 'text'
    });
    onNew(res.data);
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center p-2 border-top">
      <button type="button" className="btn btn-sm btn-light me-2">
        <IoAttachOutline size={18} />
      </button>
      <button type="button" className="btn btn-sm btn-light me-2">
        <IoHappyOutline size={18} />
      </button>
      <input
        type="text"
        className="form-control flex-grow-1"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Type a message"
      />
      <button
        type={body.trim() ? 'submit' : 'button'}
        className="btn btn-sm btn-light ms-2"
      >
        <IoMicOutline size={18} />
      </button>
    </form>
  );
}
