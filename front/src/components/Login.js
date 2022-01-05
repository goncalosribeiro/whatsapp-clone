import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div>
      <div className="chat__footer">
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Room" onChange={(e) => setRoom(e.target.value)} />
        <Link to={`/chatroom?name=${name}&room=${room}`}>
          <button
            type="submit"
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          >
            Send the message
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
