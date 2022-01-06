import Avatar from '@mui/material/Avatar';
import React from 'react';
import './SidebarChat.css';

const SidebarChat = (props) => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{props.name}</h2>
      </div>
    </div>
  );
};

export default SidebarChat;
