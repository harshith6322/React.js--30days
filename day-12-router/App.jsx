import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="app" element={<AppLayout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
