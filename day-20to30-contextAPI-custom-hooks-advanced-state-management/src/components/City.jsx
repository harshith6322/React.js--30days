/* eslint-disable no-unused-vars */
import styles from "./City.module.css";
import style from "./CityItem.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useCites } from "../context/Citiescontext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

function City() {
  const nav = useNavigate();
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { getCity, currentcity, isloading } = useCites();

  const { cityName, emoji, date, notes } = currentcity;

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  if (isloading) return <Spinner />;
  return (
    // <div>{`city${id}`}</div>
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <button
        className={style.deleteBtn}
        onClick={(e) => {
          e.preventDefault();
          nav(-1);
        }}
      >
        &times;
      </button>
    </div>
  );
}

export default City;
