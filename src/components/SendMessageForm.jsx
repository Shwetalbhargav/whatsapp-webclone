import React, { useState } from 'react';
import api from '../api';
import { Paperclip, Smile, Mic } from 'lucide-react';


export default function SendMessageForm({ waId, onNew }) {
  const [body, setBody] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/messages', { from: 'DemoUser', to: waId, body, type: 'text' });
    onNew(res.data);
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center p-2 border-top">
      <button type="button" className="btn btn-sm btn-light me-2">
        <Paperclip size={18} />
      </button>
      <button type="button" className="btn btn-sm btn-light me-2">
        <Smile size={18} />
      </button>
      <input
        className="form-control flex-grow-1"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Type a message"
      />
      {body ? (
        <button type="submit" className="btn btn-primary ms-2">
          Send
        </button>
      ) : (
        <button type="button" className="btn btn-sm btn-light ms-2">
          <Mic size={18} />
        </button>
      )}
    </form>
  );
}