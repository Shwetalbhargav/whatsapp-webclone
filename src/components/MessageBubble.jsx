import React from 'react';

export default function MessageBubble({ message }) {
  const isOutbound = message.from !== message.waId;
  const align = isOutbound ? 'justify-content-end' : 'justify-content-start';
  const bg = isOutbound ? 'bg-primary text-white' : 'bg-light text-dark';

  return (
    <div className={`d-flex ${align} my-1`}>
      <div className={`${bg} p-2 rounded`}>
        <div>{message.body}</div>
        <div className="small mt-1 d-flex justify-content-between">
          <span>{new Date(message.timestamp).toLocaleString()}</span>
          <span>{message.status}</span>
        </div>
      </div>
    </div>
  );
}
