// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useCites } from "../context/Citiescontext";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoading1, setisLoading] = useState(false);
  const { postreq, isloading } = useCites();
  const nav = useNavigate();
  const [params] = useSearchParams();
  console.log(params);
  const citylat = params.get("lat");
  const citylng = params.get("lng");
  console.log(citylat);
  const urlcity = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

  useEffect(() => {
    async function call() {
      try {
        setisLoading(true);
        const url = `${urlcity}?latitude=${citylat}&longitude=${citylng}`;
        console.log("Fetch URL:", url);
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetch Response:", data);
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
      } catch (err) {
        console.log(err);
      } finally {
        setisLoading(false);
      }
    }
    call();
  }, [citylat, citylng, urlcity]);

  function handlesubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    const newcity = {
      cityName,
      country,
      emoji: "",
      date,
      notes,
      position: { lat: citylat, lng: citylng },
    };

    nav("/app/cities");
    postreq(newcity);
  }

  return (
    <form
      className={`${styles.form} ${isloading ? "styles.loading" : ""}`}
      onSubmit={handlesubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="cityName">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => {
            setDate(date);
          }}
          selected={date}
          dateFormat="dd/mm/yyyy"
          id="cityName"
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
        <button>Add</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            nav(-1);
          }}
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}

export default Form;
