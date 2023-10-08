import { useNavigate } from 'react-router-dom';
import { useUserProvider } from '../../Providers/User.provider';
import { useState } from 'react';
import { createDog } from '../../../Api/create-dog';
import { toast } from 'react-toastify';
import styles from './dogCard.module.css';
import { supabase } from '../../../supabase.config';

export const DogCard = () => {
  const { user, setUser, setAuth, userData, usersDogs } = useUserProvider();
  const navigate = useNavigate();
  const userDataId = userData?.id;
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState(0);

  //   const [dogImg, setDogImg] = useState('');

  const addDog = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);

      if (user) {
        createDog({ name, breed, age, userDataId });
        setName('');
        setBreed('');
        setAge(0);
        toast.success('Dog Added 🐶');
        setAuth(true);
      }
    } catch (e) {
      console.log(e);
      toast.error(`${e}`);
    }
  };

  const completeSignUp = () => {
    navigate('/dashboard');
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
          <button type="button" onClick={() => addDog()}>
            Add Dog
          </button>
        </form>
        <div className={styles.dogsContainer}>
          <h3>My Dogs</h3>
          {usersDogs &&
            usersDogs.map((dog) => (
              <>
                <div key={dog.id} className={styles.dogCard}>
                  <div className={styles.dogPic}></div>
                  <div className={styles.dogInfo}>
                    <div>{dog.name}</div>
                    <div>{dog.breed}</div>
                  </div>
                  <div className={styles.dogAge}>
                    <strong>Age:</strong> {dog.age}
                  </div>
                </div>
              </>
            ))}
        </div>
        <button
          className={styles.complete}
          onClick={() => completeSignUp()}
          type="button"
        >
          Complete
        </button>
      </div>
    </>
  );
};
