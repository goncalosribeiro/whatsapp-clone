import React, { useContext } from 'react';
import './Sidebar.css';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { Search, MoreVert, DonutLarge, Chat } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import { Context } from '../store/store';
import { useResolvedPath } from 'react-router-dom';

const Sidebar = () => {
  const [state] = useContext(Context);

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
        {state.users.map((user, i) => {
          return (
            <div key={i}>
              <SidebarChat
                name={user.name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
