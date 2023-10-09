import { getAllUsers } from '../../../../Api/get-all-users';
import styles from './membersList.module.css';

export const MembersList = () => {
  return (
    <div className={styles.membersListContainer}>
      <button onClick={() => getAllUsers()}>Click</button>
    </div>
  );
};
