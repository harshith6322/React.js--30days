import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating.js";
import { useMovies } from "./useMovies.js";
import { useLocalStorage } from "./useLocalStorage.js";
import { useKey } from "./useKey.js";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=2948e8ea

const APIKEY = `2948e8ea`;
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
//MainApp--COM
export default function App() {
  // const [movies, setMovies] = useState([]);
  // const [isloading, setisloading] = useState(false);
  const [query, setQuery] = useState("");
  // const [error, seterror] = useState("");
  const [selectedid, setselectedid] = useState(null);
  // const [watched, setWatched] = useState(() => {
  //   const storedValue = localStorage.getItem("MovisList");
  //   if (storedValue === null) return []; //early return
  //   return JSON.parse(storedValue);
  // });
  const [watched, setWatched] = useLocalStorage([], "MovisList");
  // const query = "dune";
  function handleselectmovie(id) {
    setselectedid((selectedid) => (id === selectedid ? null : id));
  }
  function handlecloseid() {
    setselectedid(null);
  }
  function handleaddmovies(movies) {
    setWatched((watched) => [...watched, movies]);
    console.log("hi");
  }
  function handcloselist(id) {
    setWatched((watched) => watched.filter((movies) => movies.imdbID !== id));
  }

  // useEffect(() => {
  //   localStorage.setItem("MovisList", JSON.stringify(watched));
  // }, [watched]);

  const { movies, isloading, error } = useMovies(query);

  return (
    <>
      <Nav movies={movies}>
        <LOgo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Nav>

      <Main>
        {/* <Box1>{isloading ? <Loading /> : <MovieList movies={movies} />}</Box1> */}
        <Box1>
          {isloading && <Loading />}
          {!isloading && !error && (
            <MovieList movies={movies} onselectid={handleselectmovie} />
          )}
          {error && <Error message={error} />}
        </Box1>
        <Box1>
          {selectedid ? (
            <Moviesid
              Selectedid={selectedid}
              oncloseid={handlecloseid}
              onhandleaddlist={handleaddmovies}
              checklist={watched}
            />
          ) : (
            <>
              <Ratingbox2 watched={watched} />
              <Ratingul watched={watched} onhandleclose={handcloselist} />
            </>
          )}
        </Box1>
      </Main>
    </>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}
//for any API CALL ERROR
function Error({ message }) {
  return <p className="error">❌ {message}</p>;
}

//Nav-com
function Nav({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
//Nav-sub-com
function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function LOgo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  const inputel = useRef(null);
  useKey("Enter", function callback(e) {
    if (document.activeElement === inputel.current) return;
    inputel.current.focus();
    setQuery("");
  });

  // useEffect(function () {
  //   function callback(e) {
  //     if (document.activeElement === inputel.current) return;
  //     console.log(document.activeElement, inputel.current);
  //     if (e.code === "Enter") {
  //       inputel.current.focus();
  //       setQuery("");
  //     }
  //   }

  //   document.addEventListener("keydown", callback);
  //   return () => document.addEventListener("keydown", callback);
  // });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputel}
    />
  );
}

//Main-com
function Main({ children }) {
  return (
    <div>
      <main className="main">{children}</main>
    </div>
  );
}
//Main-subbox1-com
function Box1({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>

      {isOpen1 && children}
    </div>
  );
}
//sub
function MovieList({ movies, onselectid }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Lsit movie={movie} key={movie.imdbID} onselectid={onselectid} />
      ))}
    </ul>
  );
}
//sub-2
function Lsit({ movie, onselectid }) {
  return (
    <li onClick={() => onselectid(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function Moviesid({ Selectedid, oncloseid, onhandleaddlist, checklist }) {
  const [movie, setmovies] = useState({});
  const [isloading, setisloading] = useState(false);
  const [userrating, setuserrating] = useState();
  console.log(userrating);

  const ischeck = checklist.map((movie) => movie.imdbid).includes(Selectedid);

  const {
    Poster: poster,
    imdbRating: imdbrating,
    Gener: gener,
    Runtime: runtime,
    Released: released,
    Title: title,
    imdbID: imdbid,
    Director: director,
    Actors: actors,
    Plot: plot,
  } = movie;
  function handleadd() {
    const newmovie = {
      imdbid: Selectedid,
      title,
      released,
      poster,
      imdbrating: Number(imdbrating),
      runtime,
      userrating,
    };
    onhandleaddlist(newmovie);
    oncloseid();
  }
  useKey("Escape", oncloseid);
  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === "Escape") {
  //       oncloseid();
  //     }
  //   }
  //   document.addEventListener("keydown", callback);
  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [oncloseid]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    const icons = document.getElementsByClassName("icon");

    icons[0].setAttribute("href", `${poster}`);

    return function cleanup() {
      document.title = `usepopcorn`;
      icons[0].setAttribute("href", `${"./image.png"}`);
    };
  }, [title, poster]);

  useEffect(
    function () {
      setisloading(true);
      async function getmoviesbyid() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${Selectedid}`
        );
        const data = await res.json();
        console.log(data);
        setisloading(false);
        setmovies(data);
      }
      getmoviesbyid();
    },
    [Selectedid]
  );
  return (
    <div className="details">
      {isloading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={oncloseid}>
              &larr;
            </button>
            <img src={poster} alt={imdbid} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{gener}</p>
              <p>
                <span>⭐</span>
                {imdbrating}IMBD rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!ischeck ? (
                <>
                  {" "}
                  <StarRating
                    maxRating={10}
                    size={24}
                    defaultRating={imdbrating}
                    onSetRating={(num) => setuserrating(num)}
                  />
                  {userrating > 0 && (
                    <button className="btn-add" onClick={handleadd}>
                      + add
                    </button>
                  )}
                </>
              ) : (
                <>
                  <p>you already seen this movie</p>
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Actors: {actors}</p>
            <p>Director: {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
//Main-subbox2-com
// function Box2() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <Ratingbox2 watched={watched} />
//           <Ratingul watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
//sub-1
function Ratingul({ watched, onhandleclose }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Ratingli
          movie={movie}
          key={movie.title}
          onhandleclose={onhandleclose}
        />
      ))}
    </ul>
  );
}
//sub-2
function Ratingli({ movie, onhandleclose }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbrating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userrating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onhandleclose(movie.imdbID)}
        >
          x
        </button>
      </div>
    </li>
  );
}
//sub-com

function Ratingbox2({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
