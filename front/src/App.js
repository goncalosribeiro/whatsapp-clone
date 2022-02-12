import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="chat-clone/" element={<Login />} />
        <Route path="chat-clone/chatroom" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}
