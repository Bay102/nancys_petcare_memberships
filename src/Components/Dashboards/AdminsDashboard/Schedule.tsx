import styles from './admins.module.css';

export const Schedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=bayscodes%40gmail.com&ctz=America%2FLos_Angeles"
        className={styles.calender}
      ></iframe>
    </div>
  );
};
