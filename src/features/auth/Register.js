
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, selectAuth } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import styles from '../../styles/Forms.module.css';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    
    role: 'user', 
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);     
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuth);

  useEffect(() => {
    
    setError(null);
    
    dispatch(clearAuthError()); 
  }, [userData, dispatch]);

  
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
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 

    try {
      console.log('Sending Registration Payload:', userData);
      const response = await fetch('https://moringa-lost-and-found-backend-2.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          role: userData.role,
        }),
      });
      const data = await response.json();
      console.log('Registration Response:', response, 'Data:', data);

      if (response.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        

        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            aria-label="Username"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            aria-label="Email"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            aria-label="Password"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="role">Register as:</label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            aria-label="Select Role"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Register'}
        </button>
      </form>
      <p className={styles.linkText}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;