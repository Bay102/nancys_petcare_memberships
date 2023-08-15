import { useUserProvider } from '../Providers/User.provider';
import styles from './userProfile.module.css';

export const UserProfile = () => {
  const { usersDogs, userData } = useUserProvider();
  console.log(usersDogs, userData);
  

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <h3>My Profile</h3>
        <div className={styles.info}>
          <div className="name">
            <div className="first"></div>
            <div className="last"></div>
          </div>
        </div>
        <div className={styles.dogs}>
          <h4>My Dogs</h4>
        </div>
      </div>
    </div>
  );
};
