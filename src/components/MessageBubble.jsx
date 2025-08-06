import React from 'react';
export default function MessageBubble({ message }) {
  const isOutbound = message.from !== message.waId;
  const align = isOutbound ? 'justify-end' : 'justify-start';
  const bg = isOutbound ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black';

  return (
    <div className={`flex ${align} my-1`}>  
      <div className={`${bg} p-2 rounded-lg max-w-xs`}>  
        <div>{message.body}</div>
        <div className="text-xs mt-1 flex justify-between">
          <span>{new Date(message.timestamp).toLocaleString()}</span>
          <span>{message.status}</span>
        </div>
      </div>
    </div>
  );
}