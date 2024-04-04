import { useState, useEffect } from "react";

const APIKEY = `2948e8ea`;
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");

  useEffect(
    function () {
      async function apicall() {
        try {
          setisloading(true);
          seterror("");
          const res = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${APIKEY}`
          );
          console.log(res.ok);
          if (!res.ok) {
            throw new Error("error while calling api");
          }

          const data = await res.json();
          console.log(data.Search);
          if (data.Response === "False" || data.Error === "Too many results.") {
            throw new Error("no movie found");
          }

          setMovies(data.Search);
          setisloading(false);
        } catch (err) {
          console.log(err.message);
          seterror(err.message);
        } finally {
          setisloading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        seterror("");
        return;
      }

      apicall();
    },
    [query]
  );
  return { movies, isloading, error };
}
