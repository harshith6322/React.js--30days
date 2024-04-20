import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import Countrylist from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

//api
const api = "http://localhost:8000/cities";
//
export default function App() {
  const [cities, setcities] = useState([]);
  const [isloading, setloading] = useState(false);
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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to={"cities"} />} />
            <Route
              index
              element={<CityList cities={cities} isloading={isloading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isloading={isloading} />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<Countrylist cities={cities} isloading={isloading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
