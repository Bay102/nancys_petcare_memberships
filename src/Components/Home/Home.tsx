import { NavBar } from '../NavBar/NavBar';
import { News } from '../News/News';
import { UserProfile } from '../UserProfile/UserProfile';
import styles from './home.module.css'
import { useUserProvider } from '../Providers/User.provider';

export const Home = () => {
  const { user } = useUserProvider();
  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.content}>
        <News />
        {user && <UserProfile />}
      </div>
    </div>
  );
};

