/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useRef, useState } from 'react';
import styles from './create-profile.module.css';
import { useUserProvider } from '../Providers/User.provider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveProfile } from '../../Api/create-user-data';

export const CreateProfile = () => {
  const { user, fetchUserData } = useUserProvider();

  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const firstName = useRef<any>(null);
  const lastName = useRef<any>(null);

  const submitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (user) {
        saveProfile(
          user.user.id,
          firstName.current?.value,
          lastName.current?.value,
          phone
        ).then(() => fetchUserData());

        navigate('/dashboard');
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = event.target.value.replace(/\D/g, '');
    const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
    setPhone(formattedPhoneNumber);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const areaCode = phoneNumber.slice(0, 3);
    const middlePart = phoneNumber.slice(3, 6);
    const lastPart = phoneNumber.slice(6);

    return `(${areaCode}) ${middlePart}-${lastPart}`;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitProfile} className={styles.profileContainer}>
        <h3>Create Profile</h3>
        <div className={styles.profileInfo}>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            ref={firstName}
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            ref={lastName}
            required
          />
          <input
            name="phone"
            type="text"
            maxLength={14}
            onChange={handlePhoneNumberChange}
            placeholder="Phone Number"
            value={phone}
            // required
          />
        </div>

        <button type="submit" className={styles.save}>
          Complete
        </button>
      </form>
    </div>
  );
};
