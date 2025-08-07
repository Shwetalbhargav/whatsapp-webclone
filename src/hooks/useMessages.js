import { useState, useEffect } from 'react';
import api from '../api';

export default function useMessages(waId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!waId) return;
    setLoading(true);

    api.get(`/messages/waId/${waId}`)
      .then(res => setMessages(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [waId]);

  return { messages, setMessages, loading, error };
}
