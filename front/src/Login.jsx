import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Forms/Button';
import Input from './Forms/Input';
import { SHA256 } from 'crypto-js';

const Login = ({ setLoggedIn, api }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const passwordCrypt = SHA256(password).toString();
    try {
      const response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: passwordCrypt }),
      });
      if (response.ok) {
        setLoggedIn(true);
        navigate('/');
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <center>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            name="Username"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <Input
            type="password"
            name="Password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </center>
  );
};

export default Login;
