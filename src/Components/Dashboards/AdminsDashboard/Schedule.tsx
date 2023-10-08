import styles from './admins.module.css';

export const Schedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <iframe
        className={styles.calender}
        src="https://calendar.google.com/calendar/embed?height=598&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&showPrint=0&showNav=1&showTitle=0&showCalendars=0&title=Bookings&src=bmFuY3lzcGV0Y2FyZXNlcnZpY2VAZ21haWwuY29t&src=YWUyMmY4YTExM2NjZDY4NmUzNzViZGMwZTBkM2Y1Njg0NTM1YzRjMjY1OWNjYjM3YWE5YzZhZmM2YTNiZTc2M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23009688&color=%230B8043"
      ></iframe>
    </div>
  );
};
