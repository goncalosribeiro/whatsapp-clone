import React, { useEffect, useState, useRef, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import './Chat.css';
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
  Send,
  Forum,
} from '@mui/icons-material';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import { Context } from '../store/store';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useContext(Context);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER_ENDPOINT);
    console.log();
    const name = searchParams.get('name');
    const room = searchParams.get('room');
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
      dispatch({ type: 'USERS', payload: users });
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

  const trimmedName = name.trim().toLowerCase();

  const getTime = () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();

    return hours + ':' + minutes;
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Forum />
        <div className="chat__headerInfo">
          <p>Room</p>
          <h2>{room}</h2>
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
              <p
                key={i}
                className={
                  trimmedName === val.user
                    ? 'chat__message chat__sender'
                    : 'chat__message'
                }
              >
                {trimmedName === val.user ? null : (
                  <span className="chat__name">
                    {val.user.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                      letter.toUpperCase()
                    )}
                  </span>
                )}
                {val.text}
                <span className="chat__timestamp">{val.time}</span>
              </p>
            );
          })}
        <div ref={messagesEndRef} />
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
            {message ? <Send /> : <Mic />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
