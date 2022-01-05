import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="chatroom" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}
