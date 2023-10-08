import { NavBar } from '../NavBar/NavBar';
import styles from './home.module.css';
import { NPC } from '../NPC/NPC';

export const Home = () => {
  // const { admin, user } = useUserProvider();

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.content}>
        <NPC />
      </div>
    </div>
  );
};
