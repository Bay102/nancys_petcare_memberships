/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useRef, useState } from 'react';
import styles from './create-profile.module.css';
// import { createDog } from '../../Api/create-dog';
import { useUserProvider } from '../Providers/User.provider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveProfile } from '../../Api/create-user-data';
import { supabase } from '../../supabase.config';

export const CreateProfile = () => {
  const { user, setUser } = useUserProvider();
  const user_id = user?.id;
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const firstName = useRef<any>(null);
  const lastName = useRef<any>(null);

  const submitProfile = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);

      if (user) {
        await saveProfile(
          user_id,
          firstName.current?.value,
          lastName.current?.value,
          phone
        );

        toast.success(`Add Your Dogs🐶`);
        navigate('/add/dogs');
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
      <div className={styles.profileContainer}>
        <h3>Create Profile</h3>
        <div className={styles.profilePicContainer}>
          {/* <button onClick={() => navigate('/')}>
            <FiArrowLeftCircle />
          </button> */}

          <div className={styles.profilePic}></div>
          {/* <input type="file" name="image" /> */}
        </div>

        <div className={styles.profileInfo}>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            ref={firstName}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            ref={lastName}
          />
          <input
            name="phone"
            type="text"
            maxLength={14}
            onChange={handlePhoneNumberChange}
            placeholder="Phone Number"
            value={phone}
          />
        </div>
        <button
          className={styles.save}
          onClick={() => submitProfile()}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};
