import { useState } from 'react';
import { NavBar } from '../NavBar/NavBar';
import styles from './login.module.css';
import { login } from '../../Api/login';
import { toast } from 'react-toastify';
import { useUserProvider } from '../Providers/User.provider';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');

  const { setUser } = useUserProvider();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        throw new Error('Inputs Required');
      }

      const user = await login({ email, password });

      if (user) {
        setUser(user.user);
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
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleOnChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleOnChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
