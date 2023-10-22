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
      if (password !== confirmPassword) {
        throw new Error('Passwords Must Match');
      }
      await createUser({ email, password });

      const user = await login(email, password);
      setUser(user.session);

      navigate('/create_profile');
      toast.success('Account Created 🐾');
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
          <img className={styles.logo} src="/npc_logo.svg" alt="" />

          <h3>Create Account</h3>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
