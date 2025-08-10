// src/hooks/useMessages.js
import { useState, useEffect, useCallback } from 'react';
import api from '../api';

export default function useMessages(waId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchMessages = useCallback(async (signal) => {
    if (!waId) return;
    try {
      setLoading(true);
      //const res = await api.get(`/messages/waId/${waId}`, { signal });
      //setMessages(Array.isArray(res.data) ? res.data : []);
      const res = await api.get(`/messages/waId/${waId}`, { signal });
      const d = res.data;
      const list = Array.isArray(d) ? d
        : Array.isArray(d?.messages) ? d.messages
        : Array.isArray(d?.data) ? d.data
        : [];
      setMessages(list);
        
    } catch (e) {
      if (e.name !== 'CanceledError' && e.code !== 'ERR_CANCELED') setError(e);
    } finally {
      setLoading(false);
    }
  }, [waId]);

  useEffect(() => {
    const controller = new AbortController();
    fetchMessages(controller.signal);
    return () => controller.abort();
  }, [fetchMessages]);

  return { messages, setMessages, loading, error, refetch: fetchMessages };
}
