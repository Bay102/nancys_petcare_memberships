import { useState } from 'react';
import styles from './create-profile.module.css';
import { createDog } from '../../Api/create-dog';
import { useUserProvider } from '../Providers/User.provider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveProfile } from '../../Api/create-user-data';

export type dogCard = {
  DogCard: () => JSX.Element;
};

export const CreateProfile = () => {
  const { user } = useUserProvider();
  const navigate = useNavigate();

  const user_id = user?.id;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [dogCards, setDogCards] = useState<JSX.Element[]>([<DogCard />]);

  const addDogCard = () => {
    setDogCards([...dogCards, <DogCard />]);
  };

  const submitProfile = () => {
    try {
      if (user) {
        saveProfile({ user_id, firstName, lastName });
        toast.success('Profile Created');
        navigate('/');
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Create Profile</h3>
      <div className={styles.profileContainer}>
        <div className={styles.profilePicContainer}>
          <div className={styles.profilePic}></div>
          <input type="file" name="image" />
        </div>

        <div className={styles.profileInfo}>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className={styles.dogs}>
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
          </div>
        </div>
        <button
          className={styles.save}
          onClick={() => submitProfile()}
          type="button"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

const DogCard = () => {
  const { user } = useUserProvider();
  const user_id = user?.id;
  //   const [dogImg, setDogImg] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState(0);

  const newDog = () => {
    try {
      if (user) {
        createDog({ user_id, name, breed, age });
      }
    } catch (e) {
      console.log(e);
      toast.error(`${e}`);
    }
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.dogName}>
          <div className={styles.dogImg}>
            {/* <input
            name="img"
            type="text"
            placeholder="upload Img"
            value={dogImg}
            onChange={(e) => setDogImg(e.target.value)}
          /> */}
          </div>
          <input
            name="dogName"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.dogBreed}>
          <input
            name="breed"
            type="text"
            placeholder="Breed"
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div className={styles.dogAge}>
          <input
            name="lastName"
            type="text"
            placeholder="Age"
            onChange={(e) => setAge(+e.target.value)}
          />
        </div>
        <button type="button" onClick={() => newDog()}>
          Create Dog
        </button>
      </div>
    </>
  );
};
