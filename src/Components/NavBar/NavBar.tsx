import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { GiDogHouse } from 'react-icons/gi';
import { useUserProvider } from '../Providers/User.provider';

export const NavBar = () => {
  const { user, userData, signOut } = useUserProvider();

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
          {user && <button onClick={() => signOut()}>Log Out</button>}
          {!user && (
            <li>
              <Link className={styles.navLink} to="/login">
                <button>Member Login</button>
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link className={styles.navLink} to="/signUp">
                <button> New Members</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
