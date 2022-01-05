import React from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';

const ChatRoom = () => {
  return (
    <div className="app__body">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default ChatRoom;
