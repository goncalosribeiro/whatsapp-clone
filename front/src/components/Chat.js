import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import './Chat.css';
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
  Send,
} from '@mui/icons-material';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

let socket;

const Chat = ({ location }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    socket = io(ENDPOINT);
    // const id = nanoid();
    const name = searchParams.get('name');
    const room = searchParams.get('room');
    // setId(id);
    setName(name);
    setRoom(room);

    name &&
      room &&
      socket.emit('join', { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });
  }, [searchParams]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => {
        setMessage('');
      });
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h2>{room}</h2>
          <p>Last seen...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages &&
          messages.map((val, i) => {
            return (
              <p key={i} className="chat__message">
                <span className="chat__name">{val.user}</span>
                {val.text}
                <span className="chat__timestamp">
                  {new Date().toUTCString()}
                </span>
              </p>
            );
          })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(event) =>
              event.key === 'Enter' ? sendMessage(event) : null
            }
          />
          <button type="submit" onClick={(e) => sendMessage(e)}>
            <Send />
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
