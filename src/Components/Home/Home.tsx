import { NavBar } from '../NavBar/NavBar';
// import { UserProfile } from '../UserProfile/UserProfile';
import styles from './home.module.css';
// import { useUserProvider } from '../Providers/User.provider';
// import { Admins } from '../AdminsDashboard/Admins';
import { NPC } from '../NPC/NPC';

export const Home = () => {
  // const { admin, user } = useUserProvider();

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.content}>
        <NPC />
        {/* {admin && <Admins />} */}
        {/* {!admin && user && <UserProfile />} */}
      </div>
    </div>
  );
};
