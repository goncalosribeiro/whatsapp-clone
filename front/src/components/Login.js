import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="app__background">
      <div className="app__login">
        <h2>Pseudo Whatsapp Clone</h2>
        <form>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Room" onChange={(e) => setRoom(e.target.value)} />
          <Link to={`chatroom?name=${name}&room=${room}`}>
            <button
              type="submit"
              onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            >
              Enter
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
