import { useEffect, useState } from 'react';
import styles from './dogsList.module.css';
import { getAllDogs } from '../../../../Api/get-all-dogs';
import { DogCardAnt } from '../../../UtilityComponents/DogCard/DogCardAnt/DogCardAnt';
import { toast } from 'react-toastify';
import { SearchInput } from '../../../UtilityComponents/SearchInput';
import { DogData } from '../../../../Api/get-users-dogs';

export const DogsList = () => {
  const [dogs, setDogs] = useState<DogData[] | undefined>();

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    await getAllDogs()
      .then((dogs: DogData[]) => setDogs(dogs))
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
          dogs.map((dog: DogData) => <DogCardAnt key={dog.id} dogData={dog} />)}
      </div>
    </div>
  );
};
