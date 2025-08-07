import { useState, useEffect } from 'react';
import api from '../api';

export default function useConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    api.get('/conversations')
      .then(res => setConversations(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { conversations, loading, error };
}
