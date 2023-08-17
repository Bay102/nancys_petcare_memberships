/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { NavBar } from '../NavBar/NavBar';
import styles from './login.module.css';
import { login } from '../../Api/login';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const email = useRef<any>(null);
  const password = useRef<any>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        throw new Error('Inputs Required');
      }

      const user = await login(email.current.value, password.current.value);

      if (user) {
        toast.success('Welcome Back😁');
        navigate('/home');
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <NavBar />
      <div>
        <form className={styles.inputsContainer} action="" onSubmit={handleLogin}>
          <h3>Sign In</h3>
          <input name="email" type="email" placeholder="Email" ref={email} />
          <input
            name="password"
            type="password"
            placeholder="Password"
            ref={password}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
