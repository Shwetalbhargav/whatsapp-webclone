import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Router>
      <div className="h-screen flex">
        <aside className="w-1/3 border-r">
          <ChatList />
        </aside>
        <main className="flex-1">
          <Routes>
            <Route path="/chat/:waId" element={<ChatWindow />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;