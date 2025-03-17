import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products.jsx";
import PraductDetail from "./pages/PraductDetail.jsx";
import Categories from "./pages/Categories.jsx";
import CardListProvider from "./Context/CardList.jsx";
import Cards from "./pages/Cards.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CardListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Products />} />
            {/* <Route path="/products" element={<Products />} /> */}
            <Route path="/product-detail/:id" element={<PraductDetail />} />
            <Route path="/products/category-list" element={<Categories />} />
            <Route path="/cards" element={<Cards />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CardListProvider>
  </StrictMode>
);
