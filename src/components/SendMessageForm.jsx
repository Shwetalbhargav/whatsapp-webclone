import React, { useState } from 'react';
import useSendMessage from '../hooks/useSendMessage';
import {
  IoAttachOutline,
  IoHappyOutline,
  IoMicOutline
} from 'react-icons/io5';

export default function SendMessageForm({ waId, onNew }) {
  const [input, setInput] = useState('');
  const { send, sending, error } = useSendMessage(waId, { onSuccess: onNew });


  const handleSubmit = async (e) => {
   e.preventDefault();
   if (!input.trim()) return;
   try {
     const saved = await send(input);   
     onNew?.(saved);
     setInput('');
   } catch (err) {
     console.error(err);
   }
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
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button
        type={input.trim() ? 'submit' : 'button'}
        className="btn btn-sm btn-light ms-2"
      >
        <IoMicOutline size={18} />
      </button>
    </form>
  );
}
