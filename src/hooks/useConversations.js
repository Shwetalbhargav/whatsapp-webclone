// src/hooks/useConversations.js
import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api';

export default function useConversations({ pollMs = 0 } = {}) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const fetchConvos = useCallback(async (signal) => {
    try {
      setLoading(true);
      const res = await api.get('/conversations', { signal });
      const raw = Array.isArray(res.data) ? res.data : [];
      // normalize to shape ChatList expects
      const normalized = raw.map(c => ({
        ...c,
        lastMessage: typeof c.lastMessage === 'object'
          ? c.lastMessage
          : { snippet: c.lastMessage || '', timestamp: c.lastTimestamp || c.timestamp || Date.now() },
      }));
      setConversations(normalized);
    } catch (e) {
      if (e.name !== 'CanceledError' && e.code !== 'ERR_CANCELED') setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchConvos(controller.signal);
    if (pollMs > 0) timerRef.current = setInterval(() => fetchConvos(), pollMs);
    return () => {
      controller.abort();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchConvos, pollMs]);

  return { conversations, loading, error, refetch: () => fetchConvos() };
}
