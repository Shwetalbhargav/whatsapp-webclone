export default function SendMessageForm({ waId, onNew }) {
  const [body, setBody] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/messages', { from: 'DemoUser', to: waId, body, type: 'text' });
    onNew(res.data);
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 border-t flex">
      <input
        className="flex-1 p-2 border rounded-lg"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Send
      </button>
    </form>
  );
}