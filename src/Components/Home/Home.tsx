import { NavBar } from '../NavBar/NavBar';
import styles from './home.module.css';
import { NPC } from '../NPC/NPC';

export const Home = () => {
  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.content}>
        <NPC />
      </div>
    </div>
  );
};
