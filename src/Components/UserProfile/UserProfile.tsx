import styles from './userProfile.module.css';
import { ChangeEvent, useState } from 'react';
import { useUserProvider } from '../Providers/User.provider';
import { AddDog } from '../UtilityComponents/DogCard/AddDog';
import { FaDog, FaPlus } from 'react-icons/fa6';
import { DogCardAnt } from '../UtilityComponents/DogCard/DogCardAnt/DogCardAnt';
import ProfilePic from '../UtilityComponents/ProfilePic/ProfilePic';

export const UserProfile = () => {
  const { usersDogs, userData, avatarUrl, uploadAvatar } = useUserProvider();
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
          <ProfilePic
            url={avatarUrl ? avatarUrl : userData?.avatar_url}
            size={'100px'}
            onUpload={(event: ChangeEvent<HTMLInputElement>, url: string) => {
              uploadAvatar(event, url, 'user_data');
            }}
          />
          <div className={styles.nameNum}>
            <div className={styles.name}>
              <div className={styles.first}>{userData?.first_name}</div>
              <div className={styles.last}>{userData?.last_name}</div>
            </div>
            <div className={styles.phoneNum}>{userData?.phone}</div>
          </div>
        </div>
        <div className={styles.memberStatus}>Member Status: {'' + status}</div>
      </div>
      {!usersDogs?.length && <AddDog />}
      {showDogForm && <AddDog />}
      <div className={styles.dogsHeader}>{/* <h4>My Dogs</h4> */}</div>
      <div className={styles.dogs}>
        <div className={styles.cardsContainer}>
          {usersDogs &&
            usersDogs.map((dog) => <DogCardAnt key={dog.id} dogData={dog} />)}
        </div>
      </div>
    </div>
  );
};
