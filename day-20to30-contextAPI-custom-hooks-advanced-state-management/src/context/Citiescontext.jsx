/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext } from "react";

const api = "http://localhost:8000/cities";
const Citiescontext = createContext();

function Citiesprovider({ children }) {
  const [cities, setcities] = useState([]);
  const [isloading, setloading] = useState(false);
  const [currentcity, setcurrentcity] = useState({});
  useEffect(function () {
    setloading(true);
    async function fetchapi() {
      try {
        const res = await fetch(`${api}`);
        const data = await res.json();
        setcities(data);
      } catch {
        alert("there was an error while fetch th data");
      } finally {
        setloading(false);
      }
    }
    fetchapi();
  }, []);

  async function getCity(id) {
    try {
      setloading(true);
      const res = await fetch(`${api}/${id}`);
      const data = await res.json();
      setcurrentcity(data);
      console.log(data);
    } catch {
      alert("there was an error while fetch th data");
    } finally {
      setloading(false);
    }
  }
  async function postreq(newcity) {
    try {
      setloading(true);
      const res = await fetch(`${api}`, {
        method: "POST",
        body: JSON.stringify(newcity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setcurrentcity((cities) => [...cities, data]);
      console.log(data);
    } catch {
      alert("there was an error while fetch th data");
    } finally {
      setloading(false);
    }
  }

  async function deletereq(id) {
    try {
      setloading(true);
      await fetch(`${api}/${id}`, {
        method: "DELETE",
      });

      setcurrentcity((cities) => cities.filter((citie) => citie.id !== id));
    } catch {
      alert("there was an error while fetching the data");
    } finally {
      setloading(false);
    }
  }

  return (
    <Citiescontext.Provider
      value={{ cities, isloading, currentcity, getCity, postreq, deletereq }}
    >
      {children}
    </Citiescontext.Provider>
  );
}

function useCites() {
  const value = useContext(Citiescontext);
  if (value === undefined)
    throw new Error("reading value outside of context provider");
  return value;
}
export { Citiesprovider, useCites };
