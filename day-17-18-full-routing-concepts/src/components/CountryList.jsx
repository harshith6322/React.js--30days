/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

// eslint-disable-next-line react/prop-types
function CountryList({ cities, isloading }) {
  if (isloading) return <Spinner />;
  if (!cities.length)
    return <Message message={"add your first city by clicking on map"} />;
  const countries = [];
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </div>
  );
}

export default CountryList;
