import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { GiDogHouse } from 'react-icons/gi';
import { useUserProvider } from '../Providers/User.provider';

export const NavBar = () => {
  const { user, userData } = useUserProvider();

  return (
    <div className={styles.navContainer}>
      <nav>
        <ul className={styles.navList}>
          <img className={styles.navLogo} src="./src/assets/Logo.jpeg" alt="" />
          {user && <h4>Welcome Back, {userData?.first_name} </h4>}
          <li>
            <Link className={styles.navLink} to="/">
              <GiDogHouse className={styles.houseIcon} />
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/login">
              Member Login
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
