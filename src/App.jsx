// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Sidebar      from './components/Sidebar';
import ChatList     from './components/ChatList';
import ChatWindow   from './components/ChatWindow';

function App() {
  return (
    <Router>
      <div className="d-flex vh-100">
        {/* 1) Thin icon sidebar */}
        <aside style={{ width: 60 }} className="border-end">
          <Sidebar />
        </aside>

        {/* 2) Chat list */}
        <aside style={{ width: 300 }} className="border-end">
          <ChatList />
        </aside>

        {/* 3) Chat window */}
        <main className="flex-fill">
          <Routes>
            {/* redirect root to /chat */}
            <Route path="/" element={<Navigate to="/chat" replace />} />

            {/* you can later render a “blank” view at /chat if no waId */}
            <Route path="/chat" element={<div className="p-4">Select a chat</div>} />

            {/* actual conversation */}
            <Route path="/chat/:waId" element={<ChatWindow />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
