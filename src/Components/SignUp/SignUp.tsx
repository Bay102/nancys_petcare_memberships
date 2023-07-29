/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import styles from './signUp.module.css';
import { supabase } from '../../supabase.config';
import { NavBar } from '../NavBar/NavBar';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const handleOnChange = (e: any) => {
    const { name , value } = e.target;
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

 const handleSubmit = async ({email, password}: any) => {

      const {data, error} = await supabase.auth.signUp({
         email: email,
         password: password
      })
      if (error) {
         console.log(error);
      }
      return data
 }

  return (
    <div className={styles.signUp_container}>
      <NavBar />
      <div>
        <form className={styles.inputsContainer} onSubmit={() => handleSubmit({email, password})}>
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
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
