import Cart from "../component/Cart";
import Navigation from "../component/Navigation";
import Product from "../component/Product";
import { Route, Routes } from "react-router-dom";

export default function AllRoutes() {
  return (
    <>
      <Navigation />

      <div>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}
