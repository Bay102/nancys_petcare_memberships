/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './dogCard.module.css';
import { useUserProvider } from '../../Providers/User.provider';
import { useRef } from 'react';
import { createDog } from '../../../Api/create-dog';
import { toast } from 'react-toastify';
import { AvatarAnt } from '../Avatar';

export const AddDog = () => {
  const { user, userData, fetchDogs } = useUserProvider();
  const userDataId = userData?.id;
  const name = useRef<any>(null);
  const breed = useRef<any>(null);
  const age = useRef<any>(null);

  const addDog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (user) {
        createDog(
          name.current?.value,
          breed.current?.value,
          age.current?.value,
          userDataId
        ).then(() => fetchDogs());

        toast.success('Dog Added 🐶');
      }
    } catch (e) {
      console.log(e);
      toast.error(`${e}`);
    }
  };

  return (
    <div className={styles.createDogsContainer}>
      <form className={styles.cardContainer} onSubmit={addDog}>
        <AvatarAnt />
        <div className={styles.dogName}>
          <input
            name="dogName"
            type="text"
            placeholder="Name"
            ref={name}
            required
          />
        </div>
        <div className={styles.dogBreed}>
          <input
            name="breed"
            type="text"
            placeholder="Breed"
            ref={breed}
            required
          />
        </div>
        <div className={styles.dogAge}>
          Age:
          <input name="age" type="number" ref={age} required={true} />
        </div>
        <button className={styles.addDog} type="submit">
          Add Dog
        </button>
      </form>
    </div>
  );
};
