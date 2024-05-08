import { useSearchParams } from "react-router-dom";

export function useurlGps() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [params] = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");
  return { lat, lng };
}
