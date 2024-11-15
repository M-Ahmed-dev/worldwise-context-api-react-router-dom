// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "./context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();

  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geoCodeError, setGeoCodeError] = useState("");

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const { createCity } = useCities();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchCityData() {
      try {
        setIsGeoLoading(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log("city::", data);

        if (!data.countryCode)
          throw new Error(
            "This dosen't seem to be a valid country. Please select another one"
          );

        setCityName(data.locality || "");
        setCountryName(data.countryName || "");
        setCountryCode(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodeError(error.message);
      } finally {
        setIsGeoLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!date || !cityName) return;

    const newCity = {
      cityName,
      countryName,
      emoji: countryCode,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isGeoLoading) return <Spinner />;

  if (geoCodeError?.length > 0) return <Message message={geoCodeError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{countryCode}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
