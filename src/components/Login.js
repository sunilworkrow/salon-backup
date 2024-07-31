import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
      navigate('/home');
    };

    return (
        <div className="login-container">
          <div className="login-box">
            <h2 className='mb-4'>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='Email'
                />
              </div>
              <div className="input-group">
              
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder='Password'
                />
              </div>
              
              <button type="submit" className='submit-button mt-3'>Submit</button>
             
            </form>
          </div>
        </div>
      );
}
