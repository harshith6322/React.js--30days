import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [params, setParams] = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");
  const nav = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => nav("form")}>
      <h1>{lat}</h1>
      <h1>{lng}</h1>
    </div>
  );
}

export default Map;
