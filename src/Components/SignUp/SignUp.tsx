/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import styles from './signUp.module.css';
import { NavBar } from '../NavBar/NavBar';
import { createUser } from '../../Api/create-user';
import { toast } from 'react-toastify';


export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser({ email, password });
      toast.success('Account Created, Please Log In');
    } catch (e) {
      console.log(e);
      toast.error(`${e}`);
    }

  };

  return (
    <div className={styles.signUp_container}>
      <NavBar />
      <div>
        <form
          className={styles.inputsContainer}
          onSubmit={handleSubmit}
        >
          <h3>New Account</h3>
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
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleOnChange}
          />
          <button type="submit" >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
