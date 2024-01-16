import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../components/share/InputForm';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { BACKEND_URL } from '../variables';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      setUser({ email, password });
      const { data } = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
      if (data.success) {
        alert('Login Successfully ');
        navigate('/DashBoard');
      }
    } catch (error) {
      alert('Invalid data');
      console.error(error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <form style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
          Login is Required!!
        </div>
        <InputForm htmlFor="email" labelText="Email" type="email" name="email" value={email} handleChange={handleEmailChange} />
        <InputForm htmlFor="password" labelText="Password" type="password" name="password" value={password} handleChange={handlePasswordChange} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <p style={{ fontSize: '0.9rem', color: '#555' }}>
            Not Registered!! <Link to="/register">Register</Link>
          </p>
          <button type="submit" style={{ background: '#1890ff', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
