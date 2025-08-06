export default function SendMessageForm({ waId, onNew }) {
  const [body, setBody] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/messages', { from: 'DemoUser', to: waId, body, type: 'text' });
    onNew(res.data);
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 border-top d-flex">
      <input
        className="form-control flex-grow-1"
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Type a message..."
      />
      <button ttype="submit" className="btn btn-primary ms-2">
        Send
      </button>
    </form>
  );
}