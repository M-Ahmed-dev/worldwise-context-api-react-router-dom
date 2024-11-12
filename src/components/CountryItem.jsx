import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{country?.emoji}</span>
      <h3 className={styles.name}>{country?.country}</h3>
    </li>
  );
}

export default CountryItem;
