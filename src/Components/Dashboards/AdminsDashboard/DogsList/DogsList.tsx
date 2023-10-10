import { useEffect, useState } from 'react';
import styles from './dogsList.module.css';
import { getAllDogs } from '../../../../Api/get-all-dogs';
import { Dog } from '../../../../Api/create-dog';
import { DogCardAnt } from '../../../UtilityComponents/DogCard/DogCardAnt/DogCard';
import { toast } from 'react-toastify';
import { SearchInput } from '../../../UtilityComponents/SearchInput';

export const DogsList = () => {
  const [dogs, setDogs] = useState<Dog[]>();

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    await getAllDogs()
      .then((dogs: Dog[]) => setDogs(dogs))
      .catch((e) => toast.error(e));
  };

  const onSearch = (value: string) => {
    const filteredDogs = dogs?.filter((dog) => dog.name.includes(value));
    setDogs(filteredDogs);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <SearchInput onSearch={onSearch} />
      </div>
      <div className={styles.dogs}>
        {dogs &&
          dogs.map((dog: Dog, index: number) => (
            <DogCardAnt
              key={index}
              name={dog.name as string}
              breed={dog.breed as string}
              age={dog.age as number}
            />
          ))}
      </div>
    </div>
  );
};
