import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "./context/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities?.length)
    return <Message message="Add City by selecting it from map" />;

  const countries = cities.reduce(
    (acc, cur) => {
      if (!acc.map((el) => el.country).includes(cur.country)) {
        return [...acc, { country: cur.country, emoji: cur.emoji }];
      } else return acc;
    },

    []
  );

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
