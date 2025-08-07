import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="d-flex vh-100">
        {/* 1: Icon sidebar – fixed width */}
        <aside style={{ width: 60 }} className="border-end">
          <Sidebar />
        </aside>

        {/* 2: Chat list – fixed width or responsive */}
        <aside style={{ width: 300 }} className="border-end">
          <ChatList />
        </aside>

        {/* 3: Chat window – takes all remaining space */}
        <main className="flex-fill">
          <Routes>
            {/* Optional redirect from root */}
            <Route path="/" element={<Navigate to="/chat" replace />} />

            {/* Your actual chat route */}
            <Route path="/chat/:waId" element={<ChatWindow />} />
          </Routes>
        </main>
      </div>
    </Router>                        
  );
}

export default App;
