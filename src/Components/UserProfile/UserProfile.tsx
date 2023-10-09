import styles from './userProfile.module.css';
import { useState } from 'react';
import { useUserProvider } from '../Providers/User.provider';
import { DogCard } from '../UtilityComponents/DogCard/DogCard';
import { FaDog, FaPlus } from 'react-icons/fa6';

export const UserProfile = () => {
  const { usersDogs, userData } = useUserProvider();
  const [showDogForm, setShowDogForm] = useState(false);

  const toggleDogForm = () => {
    !showDogForm ? setShowDogForm(true) : setShowDogForm(false);
  };

  const status =
    userData?.member_status === false ? 'In-active 🚫' : 'Active ✅';

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <h3>Profile</h3>
      </div>
      <div className={styles.info}>
        <div className={styles.profilePic}></div>
        <div className={styles.nameNum}>
          <div className={styles.name}>
            <div className={styles.first}>{userData?.first_name}</div>
            <div className={styles.last}>{userData?.last_name}</div>
          </div>
          <div className={styles.phoneNum}>{userData?.phone}</div>
        </div>
        <div className={styles.memberStatus}>Member Status: {'' + status}</div>
      </div>
      <div className={styles.dogs}>
        {showDogForm && <DogCard />}
        <div className={styles.dogsHeader}>
          <h4>My Dogs</h4>
          <button className={styles.addBtn} onClick={() => toggleDogForm()}>
            <FaPlus /> <FaDog />
          </button>
        </div>
        <div className={styles.cardsContainer}>
          {usersDogs &&
            usersDogs.map((dog) => (
              <div key={dog.id} className={styles.dogCard}>
                <div className={styles.dogInfo}>
                  <div className={styles.dogPic}></div>
                  <div>{dog.name}</div>
                </div>
                <div className={styles.breed}>{dog.breed}</div>
                <div className={styles.dogAge}>
                  <strong>Age:</strong> {dog.age}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
