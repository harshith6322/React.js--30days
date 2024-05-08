/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import Countryitem from "./CountryItem";
import { useCites } from "../context/Citiescontext";
// eslint-disable-next-line react/prop-types
function CountryList() {
  const { cities, isloading } = useCites();
  if (isloading) return <Spinner />;
  if (!cities.length)
    return <Message message={"add your first city by clicking on map"} />;
  const countries = [];
  console.log(countries);
  return (
    <div className={styles.countryList}>
      {cities.map((country) => (
        <Countryitem country={country} key={country.id} />
      ))}
    </div>
  );
}

export default CountryList;
