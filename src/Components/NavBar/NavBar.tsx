import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

export const NavBar = () => {
  return (
    <div className={styles.navContainer}>
      <nav>
        <ul className={styles.navList}>
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/signUp'>Sign Up</Link>
     
     
        </ul>
      </nav>
    </div>
  );
};
