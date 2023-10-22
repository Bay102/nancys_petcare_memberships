import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { useUserProvider } from '../Providers/User.provider';

export const NavBar = () => {
  const { user, userData, signOut } = useUserProvider();

  const navigate = useNavigate();

  const logOutUser = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className={styles.navContainer}>
      <nav>
        <ul className={styles.navList}>
          {/* <img
            onClick={() => navigate('/')}
            className={styles.navLogo}
            src={'/Logo.jpeg'}
            alt=""
          /> */}
          {user && <h4>Welcome Back, {userData?.first_name} </h4>}
          {user && (
            <li>
              <Link to={'/dashboard'}>Dashboard</Link>
            </li>
          )}
          {user && <button onClick={() => logOutUser()}>Log Out</button>}
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
