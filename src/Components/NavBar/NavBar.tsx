import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { useUserProvider } from '../Providers/User.provider';

export const NavBar = () => {
  const { user } = useUserProvider();

  return (
    <div className={styles.navContainer}>
      <nav>
        <ul className={styles.navList}>
          <img className={styles.navLogo} src="./src/assets/Logo.jpeg" alt="" />
          {user && <h4>Welcome Back,  </h4>}
          <li>
            <Link className={styles.navLink} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/signUp">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
