import styles from './userProfile.module.css';
import { useState } from 'react';
import { useUserProvider } from '../Providers/User.provider';
import { AddDog } from '../UtilityComponents/DogCard/AddDog';
import { FaDog, FaPlus } from 'react-icons/fa6';
import { DogCardAnt } from '../UtilityComponents/DogCard/DogCardAnt/DogCard';
import { AvatarAnt } from '../UtilityComponents/Avatar';

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
        <button className={styles.addBtn} onClick={() => toggleDogForm()}>
          <FaPlus /> <FaDog />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.group}>
          <AvatarAnt />
          <div className={styles.nameNum}>
            <div className={styles.name}>
              <div className={styles.first}>{userData?.first_name}</div>
              <div className={styles.last}>{userData?.last_name}</div>
            </div>
            <div className={styles.phoneNum}>{userData?.phone}</div>
          </div>
        </div>
        {/* <div className={styles.profilePic}></div> */}
        <div className={styles.memberStatus}>Member Status: {'' + status}</div>
      </div>
      {showDogForm && <AddDog />}
      <div className={styles.dogsHeader}>{/* <h4>My Dogs</h4> */}</div>
      <div className={styles.dogs}>
        <div className={styles.cardsContainer}>
          {usersDogs &&
            usersDogs.map((dog) => (
              <DogCardAnt
                key={dog.id}
                name={dog.name}
                breed={dog.breed}
                age={dog.age}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
