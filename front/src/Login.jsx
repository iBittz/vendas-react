import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Forms/Button';
import Input from './Forms/Input';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
