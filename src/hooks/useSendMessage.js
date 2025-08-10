// src/hooks/useSendMessage.js
import { useState } from 'react';
import api from '../api';

export default function useSendMessage(waId, { onSuccess } = {}) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const send = async (text) => {
    setSending(true);
    try {
      const { data } = await api.post('/messages', { waId, body: text });
      onSuccess?.(data);
      return data;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setSending(false);
    }
  };

  return { send, sending, error };
}
