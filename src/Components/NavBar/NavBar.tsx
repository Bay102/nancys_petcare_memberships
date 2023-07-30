import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

export const NavBar = () => {
  return (
    <div className={styles.navContainer}>
      <nav>
        <ul className={styles.navList}>
          <Link className={styles.navLink} to='/'>Home</Link>
          <Link className={styles.navLink} to='/login'>Login</Link>
          <Link className={styles.navLink} to='/signUp'>Sign Up</Link>
        </ul>
      </nav>
    </div>
  );
};
