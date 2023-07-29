import { NavBar } from '../NavBar/NavBar'
import styles from './login.module.css'


export const Login = () => {

   return (
     <div className={styles.loginContainer}>
      <NavBar />
      <div className={styles.inputsContainer}>
            <h3>Sign In</h3>
      </div>
     </div>
   )
}