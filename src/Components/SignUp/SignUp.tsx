/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import styles from './signUp.module.css';
import { NavBar } from '../NavBar/NavBar';
import { createUser } from '../../Api/create-user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Api/login';
import { useUserProvider } from '../Providers/User.provider';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { setUser } = useUserProvider();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser({ email, password });

      const user = await login({ email, password });
      setUser(user.user);

      toast.success('Account Created 🐾');
      navigate('/create/profile');
    } catch (e) {
      console.log(e);
      toast.error(`${e}`);
    }
  };

  return (
    <div className={styles.signUp_container}>
      <NavBar />
      <div>
        <form className={styles.inputsContainer} onSubmit={handleSubmit}>
          <h5>New Member</h5>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};
