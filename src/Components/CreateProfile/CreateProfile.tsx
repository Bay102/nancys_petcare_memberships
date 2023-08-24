/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useRef, useState } from 'react';
import styles from './create-profile.module.css';
import { createDog } from '../../Api/create-dog';
import { useUserProvider } from '../Providers/User.provider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveProfile } from '../../Api/create-user-data';
import { supabase } from '../../supabase.config';

//> SPLIT CREATE PROFILE AND CREATE DOG INTO DIFFERENT PAGES

export const CreateProfile = () => {
  const { user, setUser } = useUserProvider();
  const user_id = user?.id;
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const firstName = useRef<any>(null);
  const lastName = useRef<any>(null);
  // const [dogCards, setDogCards] = useState<JSX.Element[]>([<DogCard />]);

  // const addDogCard = () => {
  //   setDogCards([...dogCards, <DogCard />]);
  // };

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
          {/* <div className={styles.dogs}>
            <div className={styles.dogHeader}>
              <h3>Dogs</h3>
              <button type="button" onClick={addDogCard}>
                Add Dog
              </button>
            </div>
            <div className={styles.dogCards}>
              {dogCards.map((dogCard: JSX.Element, index: number) => (
                <div key={index}>{dogCard}</div>
              ))}
            </div>
          </div> */}
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

export const DogCard = () => {
  const { user, userData } = useUserProvider();
  const navigate = useNavigate();
  const userDataId = userData?.id;
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState(0);

  //   const [dogImg, setDogImg] = useState('');

  const addDog = () => {
    console.log(user);
    try {
      console.log(userDataId);
      if (user) {
        setName('');
        setBreed('');
        setAge(0);
        createDog({ name, breed, age, userDataId });
        toast.success('Dog Added 🐶');
      }
    } catch (e) {
      console.log(e);
      toast.error(`${e}`);
    }
  };

  return (
    <>
      <div className={styles.createDogsContainer}>
        <form className={styles.cardContainer}>
          <div className={styles.dogImg}>
            {/* <input
            name="img"
            type="text"
            placeholder="upload Img"
            value={dogImg}
            onChange={(e) => setDogImg(e.target.value)}
          /> */}
          </div>
          <div className={styles.dogName}>
            <input
              name="dogName"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.dogBreed}>
            <input
              name="breed"
              type="text"
              placeholder="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          <div className={styles.dogAge}>
            <input
              name="lastName"
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(+e.target.value)}
            />
          </div>
          <button type='button' onClick={() => addDog()}>
            Add Dog
          </button>
        </form>
        <div className={styles.dogsContainer}>
          <h3>My Dogs</h3>
        </div>
        <button className={styles.complete} onClick={() => navigate('/')}>
          Complete
        </button>
      </div>
    </>
  );
};
