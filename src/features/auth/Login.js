
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearAuthError, selectAuth } from './authSlice'; 
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import styles from '../../styles/Forms.module.css';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);     

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuth); 

  useEffect(() => {
    
    setError(null);
    dispatch(clearAuthError()); 
  }, [credentials, dispatch]);

  
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  }, [isAuthenticated, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    try {
      console.log('Sending Payload:', credentials); 
      const response = await fetch('https://my-repository-0z47.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        data = { message: text || 'Invalid response format' };
      }
      console.log('Response:', response, 'Data:', data, 'Raw Text:', text);

      if (response.ok) {
        const token = data.token || data.access_token;
        
        dispatch(setAuth({ user: data.user, token: token }));
        navigate('/'); 
      } else {
        setError(data.message || 'Imekataa bana');
      }
    } catch (err) {
      setError('An error occurred. Please try again. Check console for details.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username" 
            value={credentials.username}
            onChange={handleChange}
            required
            aria-label="Username"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password" 
            value={credentials.password}
            onChange={handleChange}
            required
            aria-label="Password"
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Login'}
        </button>
      </form>
      <p className={styles.linkText}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;