/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCites } from "../context/Citiescontext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentcity, deletereq } = useCites();
  console.log(city);

  function handleclosebtn(e) {
    e.preventDefault();
    console.log("test");
    deletereq(id);
    window.location.reload();
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentcity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <span className={styles.date}>{formatDate(date)}</span>
        <button className={styles.deleteBtn} onClick={handleclosebtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
