/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCites } from "../context/Citiescontext";

function CityList() {
  const { cities, isloading } = useCites();
  if (isloading) return <Spinner />;
  if (!cities.length)
    return <Message message={"add your first city by clicking on map"} />;
  return (
    <div className={styles.cityList}>
      {cities.map((citie) => (
        <CityItem key={citie.id} city={citie} />
      ))}
    </div>
  );
}

export default CityList;
