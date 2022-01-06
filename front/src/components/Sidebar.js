import React from 'react';
import './Sidebar.css';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { Search, MoreVert, DonutLarge, Chat } from '@mui/icons-material';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__header_right">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/* <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <Search />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div> */}
      <div className="sidebar__chat">
        <h3>Users in room</h3>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
