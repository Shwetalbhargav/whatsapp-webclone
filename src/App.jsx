import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Router>                            {/* ← opening tag */}
      <div className="d-flex vh-100">
        <aside className="col-4 border-end">
          <ChatList />
        </aside>

        <main className="flex-fill">
          <Routes>
            <Route path="/chat/:waId" element={<ChatWindow />} />
          </Routes>
        </main>
      </div>
    </Router>                           
  );
}

export default App;
