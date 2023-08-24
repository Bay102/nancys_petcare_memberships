import { NavBar } from '../NavBar/NavBar';
import { News } from '../IFrame/News';
import { UserProfile } from '../UserProfile/UserProfile';
import styles from './home.module.css';
import { useUserProvider } from '../Providers/User.provider';
import { Admins } from '../AdminsDashboard/Admins';

export const Home = () => {
  const { admin, user } = useUserProvider();
  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.content}>
        {admin && <Admins />}
        {!admin && user && <News />}
        {!admin && user && <UserProfile />}
      </div>
    </div>
  );
};
