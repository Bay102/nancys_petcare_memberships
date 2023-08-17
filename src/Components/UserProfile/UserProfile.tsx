import { useUserProvider } from '../Providers/User.provider';
import styles from './userProfile.module.css';
import { CiEdit } from 'react-icons/ci';

export const UserProfile = () => {
  const { usersDogs, userData } = useUserProvider();

  const status = userData?.member_status === false ? 'In-active' : 'Active';

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <h3>Profile</h3>
        <button>
          <CiEdit />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.profilePic}></div>

        <div className={styles.nameNum}>
          <div className={styles.name}>
            <div className={styles.first}>{userData?.first_name}</div>
            <div className={styles.last}>{userData?.last_name}</div>
          </div>
          <div className={styles.phoneNum}>763-787-9898</div>
        </div>
        <div className={styles.memberStatus}>Member Status: {status}</div>
      </div>
      <div className={styles.dogs}>
        <div className={styles.dogsHeader}>
          <h4>My Dogs</h4>
        </div>
        <div className={styles.cardsContainer}>
          {usersDogs &&
            usersDogs.map((dog) => (
              <>
                <div key={dog.id} className={styles.dogCard}>
                  <div className={styles.dogPic}></div>
                  <div className={styles.dogInfo}>
                    <div>{dog.name}</div>
                    <div>{dog.breed}</div>
                  </div>
                  <div className={styles.dogName}>
                    <strong>Age:</strong> {dog.age}
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};
